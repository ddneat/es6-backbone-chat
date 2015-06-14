var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://localhost:3000';

var options ={
    transports: ['websocket'],
    'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};

describe("Chat Server",function(){
    it('Should broadcast new user to all users', function(done){
        var client1 = io.connect(socketURL, options);

        client1.on('connect', function(){
            client1.emit('newUser', chatUser1);

            var client2 = io.connect(socketURL, options);

            client2.on('connect', function(data){
                client2.emit('newUser', chatUser2);
            });

            client2.on('newUser', function(user){
                user.name.should.equal(chatUser2.name);
                client2.disconnect();
            });

        });

        var numUsers = 0;
        client1.on('newUser', function(user){
            numUsers += 1;

            if(numUsers === 2){
                user.name.should.equal(chatUser2.name);
                client1.disconnect();
                done();
            }
        });
    });
    it('Should be able to create new room', function(done){
        var roomName = '/testRoom';
        var client1 = io.connect(socketURL + roomName, options);

        client1.on('connect', function(){
            client1.emit('newUser', chatUser1);

            var client2 = io.connect(socketURL + roomName, options);

            client2.on('connect', function(data){
                client2.emit('newUser', chatUser2);
            });

            client2.on('newUser', function(user){
                user.name.should.equal(chatUser2.name);
                client2.disconnect();
            });

        });

        var numUsers = 0;
        client1.on('newUser', function(user){
            numUsers += 1;

            if(numUsers === 2){
                user.name.should.equal(chatUser2.name);
                client1.disconnect();
                done();
            }
        });
    });
});