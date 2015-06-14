import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import MessageCollection from './messageCollection';
import RoomCollection from './roomCollection';
import UserCollection from './userCollection';

import MessageView from './messageView';
import RoomView from './roomView';
import UserView from './userView';

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

    }

    // Events Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    events() {
        return {
            'click .btn-submit--message': 'submitMessage',
            'click .btn-submit--room': 'submitRoom',
            'click .btn-remove--room': 'removeRoom',
            'click .room-list__item': 'joinRoom',
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
        this.template = _.template($('script[name="chat"]').html());
    }

    render() {
        this.$el.html(this.template);

        var messageView = new MessageView();
        this.$el.find('.view-chat__messages').prepend(messageView.render().$el);

        var roomView = new RoomView();
        this.$el.find('.view-chat__sidebar__nav').append(roomView.render().$el);

        var userView = new UserView();
        this.$el.find('.view-chat__sidebar').append(userView.render().$el);

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
            MessageCollection.newMessage(text);
            this.$el.find('.input-message').val('');
        }
    }

    submitRoom() {
        var roomName = this.$el.find('.input-room').val();
        if(roomName.length) {
            RoomCollection.newRoom(roomName);
            this.$el.find('.input-room').val('');
        }
    }

    removeRoom(e) {
        e.preventDefault();
        e.stopPropagation();
        var roomId = $(e.currentTarget).parent().data('room-id');
        RoomCollection.removeRoom(roomId);
    }

    joinRoom(e) {
        e.preventDefault();
        e.stopPropagation();
        var roomId = $(e.currentTarget).data('room-id');
        RoomCollection.joinRoom(roomId);
    }

}

export { HomeView, ChatView };