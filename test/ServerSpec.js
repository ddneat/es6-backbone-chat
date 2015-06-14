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
    xit('Should broadcast messages in room to everybody subscribed to room', (done) => {
        var client1 = io.connect(socketURL, options);
        var receivedMessages = 0;

        function addReceivedMessage() {
            receivedMessages++;
            if(receivedMessages >= 3)
            done();
        }

        var spy = chai.spy(addReceivedMessage);

        client1.on('serverReady', () => {
            client1.emit('newUser');

            client1.on('message', (msg) => {
                spy();
            });

            var client2 = io.connect(socketURL, options);

            client2.on('serverReady', () => {
                client2.emit('newUser');

                client2.on('message', (msg) => {
                    spy();
                });

                var client3 = io.connect(socketURL, options);

                client3.on('serverReady', () => {
                    client3.emit('newUser');
                    client3.emit('newRoom', 'testRoom');

                    client3.on('message', (msg) => {
                        spy();
                    });

                    client3.on('updateRooms', () => {
                        client1.emit('newMessage', 'test');
                    });

                });

            });

            client2.on('newUser', (user) => {
                client2.disconnect();
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