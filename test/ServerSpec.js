var io = require('socket.io-client');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var should = chai.should()
    , expect = chai.expect;

var socketURL = 'http://localhost:3000';

var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe("Chat Server", () => {
    it('Should join lobby on removed room', () => {
        var client1 = io.connect(socketURL, options);

        client1.on('serverReady', () => {
            client1.emit('newUser');

            var room = {};

            client1.emit('newRoom', 'testRoom');

            client1.on('userJoined', (res) => {
                if(res.room.roomName == 'testRoom') {
                    room = res.room;
                    client1.emit('removeRoom', room._id);
                } else {
                    res.room.roomName.should.equal('lobby');
                }
            });


        });
    });
    it('Should join lobby on connect', () => {
        var client1 = io.connect(socketURL, options);

        client1.on('serverReady', () => {
            client1.emit('newUser');

            client1.on('serverReady', (res) => {
                res.room.roomName.should.equal('lobby');
            });


        });
    });
    it('Should join room', () => {
        var client1 = io.connect(socketURL, options);

        client1.on('serverReady', () => {
            client1.emit('newUser');

            client1.emit('newRoom', 'testRoom');

            client1.on('userJoined', (res) => {
                res.room.roomName.should.equal('testRoom');
            });


        });
    });
    it('Should broadcast new user to all users', (done) =>{
        var client1 = io.connect(socketURL, options);

        client1.on('serverReady', () => {
            client1.emit('newUser');

            var client2 = io.connect(socketURL, options);

            client2.on('serverReady', (data) => {
                client2.emit('newUser');
            });

            client2.on('newUser', (user) => {
                client2.disconnect();
            });

        });

        var numUsers = 0;
        client1.on('newUser', () => {
            numUsers += 1;

            if(numUsers === 1){
                client1.disconnect();
                done();
            }
        });
    });

});