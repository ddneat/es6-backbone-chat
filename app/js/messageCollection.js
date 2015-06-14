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

        setInterval(() => {
            console.log('Emit');
            IOSocket.emit('newMessage', 'Some text');
        }, 1000);

        this.add({message: 'Some text'});
        this.add({message: 'Another text'});
    }

}

export default new MessageCollection();