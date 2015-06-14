import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import UserCollection from './userCollection';

export default class UserView extends Backbone.View {
    constructor() {
        super({collection: UserCollection});
    }

    // ClassName Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    className() {
        return 'user-list';
    }

    // tagName Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    tagName() {
        return 'ul';
    }

    initialize() {
        this.listenTo(this.collection, 'add', this.render);

        this.template = _.template($('script[name="user"]').html());
    }

    render() {
        this.$el.show().html(this.template({
            users: this.collection.toJSON()
        }));

        return this;
    }
}