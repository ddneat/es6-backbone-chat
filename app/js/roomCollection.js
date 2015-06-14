import Backbone from 'backbone';
import RoomModel from './roomModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = RoomModel;

        this.create({title: 'Room-1'});
        this.create({title: 'Room-2'});
    }

}

export default new MessageCollection();