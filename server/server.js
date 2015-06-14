var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

http.listen(3000, function(){
    console.log('Chat listening on *:3000');
});

mongoose.connect('mongodb://localhost/chat_probst_neubauer', function(err) {
    if(err) throw err;
    mongoose.connection.db.dropDatabase();//TODO: remove in production
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

var lobby = {};
Room.findOne({roomName: 'lobby'}, function(err) {
    if (err) throw err;
    lobby = new Room({roomName: 'lobby', owner: {_id: 0}});
    lobby.save(function(err) {});
});

app.get('/', function(req, res) {
    res.send('Hello!');
});

io.on('connection', function(socket) {
    Room.findOne({roomName: 'lobby'}, function(err, room) {
        if (err) throw err;
        console.log(room);
        socket.room = room;
        socket.join('lobby');
        socket.emit('serverReady', {room: room});
    });

    Room.find({}, function(err, rooms) {
        if (err) throw err;
        io.emit('updateRooms', {rooms: rooms});
    });

    socket.on('newUser', function() {
        var username = 'User-' + Math.floor(Math.random()*10001);
        socket.user = new User({userName: username});
        socket.user.save(function(err) {
            socket.emit('newUser', socket.user);
        });
    });

    socket.on('disconnect', function() {
        User.remove(socket.user, function() {
            removeRoomsOfUser(socket.user);
        });
    });

    function removeRoomsOfUser(user) {
        Room.find({'owner._id': user._id}).remove().exec();
    }

    function leaveAllRooms(socket) {
        for(var i = 0; i < socket.rooms.length; i++) {
            socket.leave(socket.rooms[i]);
        }
    }

    socket.on('newMessage', function(msg) {
        io.to(socket.room.roomName).emit('message', { message: msg, user: socket.user });
    });

    socket.on('newRoom', function(roomName) {
        socket.room = new Room({roomName: roomName, owner: socket.user});
        socket.room.save(function(err) {
            socket.join(roomName);
            Room.find({}, function(err, rooms) {
                if (err) throw err;
                socket.emit('userJoined', { room: socket.room });
                io.emit('updateRooms', {rooms: rooms});
            });
        });
    });

    socket.on('removeRoom', function(roomId) {
        Room.findOne({'_id': roomId}, function(err, room) {
            if(room && room.owner && (room.owner._id.equals(socket.user._id))) {
                room.remove(function() {
                    Room.find({}, function(err, rooms) {
                        if (err) throw err;
                        io.emit('updateRooms', {rooms: rooms});
                    });
                })
            }
        });
    });

    socket.on('joinRoom', function(roomId) {
        Room.findOne({_id: roomId}, function(err, room) {
            if (err) throw err;

            leaveAllRooms(socket);
            socket.room = room;
            socket.join(room.roomName);
            socket.emit('userJoined', { room: room });
        });
    });
});