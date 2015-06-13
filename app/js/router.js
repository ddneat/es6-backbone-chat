import $ from 'jquery';
import Backbone from 'backbone';
import { HomeView, ChatView } from './views';
import UsersCollection from './usersCollection';

export default class Router extends Backbone.Router {
    constructor() {
        super();
        Backbone.history.start();
    }

    // Routes Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as routes property.
    routes() {
        return {
            'chat': 'chat',
            '*default': 'default'
        }
    }

    chat() {
        var view = new ChatView({model: UsersCollection});
        $('#app').html(view.render().$el);
    }

    default() {
        var view = new HomeView();
        $('#app').html(view.render().$el);
    }
}
