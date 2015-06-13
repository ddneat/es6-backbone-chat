import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import RoomCollection from './roomCollection';
import UserCollection from './userCollection';
import MessageCollection from './messageCollection';

class HomeView extends Backbone.View {

    initialize() {
        this.template = $('script[name="home"]').html();
    }

    render() {
        this.$el.html(_.template(this.template));
        return this;
    }

}

class ChatView extends Backbone.View {

    constructor() {
        super();

        this.roomsCollection = RoomCollection;
        this.usersCollection = UserCollection;
        this.messageCollection = MessageCollection;
    }

    // Events Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as events property.
    events() {
        return {
            'click .btn-submit': 'submitMessage'
        }
    }

    initialize() {
        this.listenTo(this.model, 'all', this.render);

        this.template = _.template($('script[name="chat"]').html());
    }

    render() {
        this.$el.show().html(this.template({
            rooms: this.roomsCollection.toJSON(),
            users: this.usersCollection.toJSON(),
            messages: this.messageCollection.toJSON()
        }));

        return this;
    }

    submitMessage() {
        console.log('submit called');
    }

}

export { HomeView, ChatView };