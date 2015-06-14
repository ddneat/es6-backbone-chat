import Backbone from 'backbone';
import MessageModel from './messageModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = MessageModel;

        IOSocket.on('message', (res) => {
            this.add({message: res.message, user: res.user});
        });

        Backbone.on('RoomChanged', this.reset, this);

    }

    newMessage(text) {
        IOSocket.emit('newMessage', text);
    }
}

export default new MessageCollection();