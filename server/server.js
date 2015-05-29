var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('Hello!');
});

io.on('connection', function(socket){
    socket.emit('serverReady');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(3000, function(){
    console.log('Chat listening on *:3000');
});