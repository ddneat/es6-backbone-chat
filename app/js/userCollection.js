import Backbone from 'backbone';
import User from './userModel';
import IOSocket from './ioSocket.js';

class UsersCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = User;

        this.create({title: 'User-A'});
        this.create({title: 'User-B'});
        this.create({title: 'User-C'});
    }

}

export default new UsersCollection();