import Backbone from 'backbone';

export default class Message extends Backbone.Model {

    constructor() {
        super(...arguments);
    }

    defaults() {
        return {
            message: ''
        };
    }

    // override default backbone method
    sync() {
        return false;
    }

}