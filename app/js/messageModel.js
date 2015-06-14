import Backbone from 'backbone';

export default class Message extends Backbone.Model {

    constructor() {
        super(...arguments);
    }

    defaults() {
        return {
            message: '',
            user: {}
        };
    }

    // override default backbone method
    sync() {
        return false;
    }

}