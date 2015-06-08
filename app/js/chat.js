import Backbone from 'backbone';
import io from 'socket.io-client';

class Chat extends Backbone.Model {

    constructor() {
        super();

        this.socket = io.connect('http://localhost:3000');
        this.socket.on('serverReady', this.serverReady.bind(this));
    }

    serverReady() {
        this.socket.emit('newMessage', 'hello from client!');
    }

}

export default new Chat();