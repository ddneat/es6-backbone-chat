import Backbone from 'backbone';

export default class Room extends Backbone.Model {

    constructor() {
        super(...arguments);
    }

    defaults() {
        return {
            roomName: 'Room-0',
            owner: {}
        };
    }

    // override default backbone method
    sync() {
        return false;
    }

}