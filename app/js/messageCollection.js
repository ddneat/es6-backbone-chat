import Backbone from 'backbone';
import MessageModel from './messageModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = MessageModel;

        IOSocket.on('message', (res) => {
            console.log('Server', res);
            this.create({message: res.message});
        });

        setTimeout(() => {
            console.log('Emit');
            IOSocket.emit('newMessage', 'Some text');
        }, 500);

        this.create({message: 'Some text'});
        this.create({message: 'Another text'});
    }

}

export default new MessageCollection();