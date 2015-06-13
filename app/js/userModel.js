import Backbone from 'backbone';

export default class User extends Backbone.Model {
    constructor() {
        super();

        this.title = 'test';
    }

}