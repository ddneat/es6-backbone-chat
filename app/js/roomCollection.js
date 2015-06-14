import Backbone from 'backbone';
import RoomModel from './roomModel';
import IOSocket from './ioSocket.js';

class MessageCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = RoomModel;

        IOSocket.on('updateRooms', (res) => {
            this.reset();
            this.add(res.rooms);
        });

        IOSocket.on('userJoined', (room) => {
            console.log('user joined');
            IOSocket.room == room;
        });
    }

}

export default new MessageCollection();