import Backbone from 'backbone';
import RoomModel from './roomModel';
import IOSocket from './ioSocket.js';

class RoomCollection extends Backbone.Collection {

    constructor() {
        super();

        this.model = RoomModel;

        IOSocket.on('updateRooms', (res) => {
            this.reset();
            this.add(res.rooms);
        });

        IOSocket.on('serverReady', (room) => {
            IOSocket.room = room;
            this.trigger("change");
        });

        IOSocket.on('userJoined', (room) => {
            IOSocket.room = room;
            this.trigger("change");
        });
    }

    newRoom(roomName) {
        IOSocket.emit('newRoom', roomName);
    }

    removeRoom(roomId) {
        IOSocket.emit('removeRoom', roomId);
    }

    joinRoom(roomId) {
        IOSocket.emit('joinRoom', roomId);
    }

}

export default new RoomCollection();