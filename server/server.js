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

    socket.user = new User({userName: 'testuser'});
    socket.user.save(function(err) {
        console.log('newUser');
    });

    socket.on('disconnect', function() {
        User.remove(socket.user, function() {
            console.log('user disconnected');
        });
    });

    socket.on('newUser', function(userName) {
        console.log('new user: ' + userName);
        io.emit('newUser', userName);
    });

    socket.on('newMessage', function(msg) {
        console.log('new message: ' + msg);
        io.emit('message', { message: 'world', user: 'test' });
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