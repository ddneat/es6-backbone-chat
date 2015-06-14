import Backbone from 'backbone';
import User from './userModel';
import IOSocket from './ioSocket.js';

class UsersCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = User;

        IOSocket.on('serverReady', () => {
            IOSocket.emit('newUser');
        });

        IOSocket.on('newUser', (user) => {
            IOSocket.user = user;
        });
    }

}

export default new UsersCollection();