import Backbone from 'backbone';
import User from './userModel';
import IOSocket from './ioSocket.js';

class UsersCollection extends Backbone.Collection {
    constructor() {
        super();

        this.model = User;

        var that = this;
        IOSocket.on('message', (res) => {
            console.log('Server', res);
            that.create({title: 'awesome'});
        });

        setTimeout(() => {
            console.log('Emit');
            IOSocket.emit('newMessage', 'asd');
        }, 500);

        that.create({title: 'awesome'});
        that.create({title: 'bla'});
        that.create({title: 'bla'});
    }

}

export default new UsersCollection();