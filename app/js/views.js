import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
//import Chat from './chat';
import UsersCollection from './usersCollection';

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
        super({model: UsersCollection});
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
        if(this.model.length) {
            this.$el.show().html(this.template({users: this.model.toJSON()}));
            return this;
        }

        this.$el.hide();
        return this;
    }

    submitMessage() {
        console.log('submit called');
    }

}

export { HomeView, ChatView };