var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send('Hello!');
});

io.on('connection', function(socket) {
    socket.emit('serverReady');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('newMessage', function(msg) {
        console.log('new message: ' + msg);
        socket.emit('message', { message: 'world', user: 'test' });
    });

    socket.on('newUser', function(msg) {
        console.log('new user: ' + msg);
    });

    socket.on('newRoom', function(msg) {
        console.log('new room: ' + msg);
    });

    socket.on('removeRoom', function(msg) {
        console.log('remove room: ' + msg);
    });

    socket.on('joinRoom', function(msg) {
        console.log('join room: ' + msg);
    });

    socket.on('leaveRoom', function(msg) {
        console.log('leave room: ' + msg);
    });
});

http.listen(3000, function(){
    console.log('Chat listening on *:3000');
});