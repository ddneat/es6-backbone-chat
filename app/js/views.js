import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import RoomCollection from './roomCollection';
import UserCollection from './userCollection';
import MessageCollection from './messageCollection';

class HomeView extends Backbone.View {

    className() {
        return 'view-home';
    }

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
        super(...arguments);

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
            'click .btn-submit': 'submitMessage',
            'keyup .input-message': 'submitOnEnter'
        }
    }

    // ClassName Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    className() {
        return 'view-chat';
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

    submitOnEnter() {
        if(event.keyCode == 13) {
            this.submitMessage();
        }
    }

    submitMessage() {
        var text = this.$el.find('.input-message').val();
        console.log('submit called', text);
        this.$el.find('.input-message').val('');
    }

}

export { HomeView, ChatView };