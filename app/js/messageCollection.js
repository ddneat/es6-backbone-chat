import Backbone from 'backbone';
import MessageModel from './messageModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = MessageModel;

        IOSocket.on('message', (res) => {
            this.add({message: res.message});
        });

    }
}

export default new MessageCollection();