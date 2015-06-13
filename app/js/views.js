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
            'click .btn-submit--message': 'submitMessage',
            'click .btn-submit--room': 'submitRoom',
            'keyup .input-message': 'submitMessageOnEnter',
            'keyup .input-room': 'submitRoomOnEnter'
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

    isEnterKeyCode(event) {
        return event.keyCode == 13;
    }

    submitMessageOnEnter() {
        this.isEnterKeyCode(event) && this.submitMessage();
    }

    submitRoomOnEnter() {
        this.isEnterKeyCode(event) && this.submitRoom();
    }

    submitMessage() {
        var text = this.$el.find('.input-message').val();
        if(text.length) {
            console.log('submit message called', text);
            this.$el.find('.input-message').val('');
        }
    }

    submitRoom() {
        var text = this.$el.find('.input-room').val();
        if(text.length) {
            console.log('submit room called', text);
            this.$el.find('.input-room').val('');
        }
    }

}

export { HomeView, ChatView };