import Backbone from 'backbone';
import User from './userModel';
import IOSocket from './ioSocket.js';

class UsersCollection extends Backbone.Collection {
    constructor() {
        super();
        IOSocket.on('message', (res) => {
            console.log('Asd', res);
        });
        setTimeout(() => {
            console.log('send');
            IOSocket.emit('newMessage', 'asd');
        }, 500);
    }

    model() {
        return User;
    }

}

export default new UsersCollection();