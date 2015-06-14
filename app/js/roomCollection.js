import Backbone from 'backbone';
import RoomModel from './roomModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = RoomModel;

        IOSocket.on('updateRooms', (res) => {
            console.log(res.rooms);
            this.reset();
            this.add(res.rooms);
        });
    }

}

export default new MessageCollection();