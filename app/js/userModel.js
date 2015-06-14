import Backbone from 'backbone';

export default class User extends Backbone.Model {

    constructor() {
        super(...arguments);
    }

    defaults() {
        return {
            userName: 'User'
        };
    }

    // override default backbone method
    sync() {
        return false;
    }

}