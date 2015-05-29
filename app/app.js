import io from 'socket.io-client';

var socket = io.connect('http://localhost:3000');

socket.on('serverReady', function() {
    setInterval(function(){
        socket.emit('chat message', 'hello from client!!!!!!!!!!!!!!!!');
    }, 1000);
});