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

app.get('/', function(req, res) {
    res.send('Hello!');
});

io.on('connection', function(socket) {
    socket.emit('serverReady');

    socket.on('newUser', function() {
        var username = 'User-' + Math.floor(Math.random()*10001);
        socket.user = new User({userName: username});
        socket.user.save(function(err) {
            console.log('newUser', username);
        });
    });

    socket.on('disconnect', function() {
        User.remove(socket.user, function() {
            console.log('user disconnected');
        });
    });

    socket.on('newMessage', function(msg) {
        io.emit('message', { message: msg, user: socket.user });
    });

    socket.on('newRoom', function(msg) {
        console.log('new room: ' + msg);
        socket.emit('roomsChanged', { message: 'dummy' });
    });

    socket.on('removeRoom', function(msg) {
        console.log('remove room: ' + msg);
        socket.emit('roomsChanged', { message: 'dummy' });
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