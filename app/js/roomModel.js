import Backbone from 'backbone';

export default class Room extends Backbone.Model {

    constructor() {
        super(...arguments);
    }

    defaults() {
        return {
            title: 'Room-0'
        };
    }

    // override default backbone method
    sync() {
        return false;
    }

}