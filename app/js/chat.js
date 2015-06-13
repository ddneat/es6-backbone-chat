import Backbone from 'backbone';
import io from 'socket.io-client';

class Chat extends Backbone.Model {

    constructor() {
        super();

        this.socket = io.connect('http://localhost:3000');
        this.socket.on('serverReady', this.serverReady.bind(this));
        this.socket.on('newMessage', this.receivedMessage.bind(this));
        this.socket.on('roomsChanged', this.roomsChanged.bind(this));
        this.socket.on('userLeft', this.userLeft.bind(this));
        this.socket.on('userJoined', this.userJoined.bind(this));


    }

    getMessage() {
        return 'dummy';
    }

    getUsername() {
        return 'User-' + Date.now();
    }

    serverReady() {
        this.socket.emit('newUser', {name: this.getUsername()});
    }

    submitMessage() {
        this.socket.emit('newMessage', {text: this.getMessage()});
    }

    receivedMessage(msg) {
        console.log('receivedMessage', msg);
    }

    roomsChanged(msg) {
        console.log('roomsChanged', msg);
    }

    userLeft(msg) {
        console.log('usersChanged', msg);
    }

    userJoined(msg) {
        console.log('usersChanged', msg);
    }

}

export default new Chat();