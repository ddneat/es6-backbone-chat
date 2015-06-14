var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

http.listen(3000, function(){
    console.log('Chat listening on *:3000');
});

mongoose.connect('mongodb://localhost/chat_probst_neubauer', function(err) {
    if(err) throw err;
    console.log('MongoDB Connected');
});

var userSchema = mongoose.Schema({
    userName: String
});

var User = mongoose.model('Users', userSchema);

var roomSchema = mongoose.Schema({
    roomName: String,
    owner: Object,
    users: Array
});

var Room = mongoose.model('Rooms', roomSchema);

app.get('/', function(req, res) {
    res.send('Hello!');
});

io.on('connection', function(socket) {
    socket.emit('serverReady');

    Room.find({}, function(err, rooms) {
        if (err) throw err;
        io.emit('updateRooms', {rooms: rooms});
    });

    socket.on('newUser', function() {
        var username = 'User-' + Math.floor(Math.random()*10001);
        socket.user = new User({userName: username});
        socket.user.save(function(err) {
            console.log('newUser', socket.user);
        });
    });

    socket.on('disconnect', function() {
        User.remove(socket.user, function() {
            removeRoomsOfUser(socket.user, function() {

            });
        });
    });

    function removeRoomsOfUser(user) {
        Room.find({'owner._id': user._id}).remove().exec();
    }

    socket.on('newMessage', function(msg) {
        io.emit('message', { message: msg, user: socket.user });
    });

    socket.on('newRoom', function(room) {
        socket.room = new Room({roomName: room, owner: socket.user});
        socket.room.save(function(err) {
            socket.join(room);
            Room.find({}, function(err, rooms) {
                if (err) throw err;
                io.emit('updateRooms', {rooms: rooms});
            });
        });
    });

    socket.on('removeRoom', function(msg) {
        Room.find({}, function(err, rooms) {
            if (err) throw err;
            io.emit('updateRooms', {rooms: rooms});
        });
    });

    socket.on('joinRoom', function(msg) {
        console.log('join room: ' + msg);
        socket.emit('userJoined', { message: 'dummy' });
    });

    socket.on('leaveRoom', function(msg) {
        console.log('leave room: ' + msg);
        socket.emit('userLeft', { message: 'dummy' });
    });
});