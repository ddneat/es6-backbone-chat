import $ from 'jquery';
import Backbone from 'backbone';
import io from 'socket.io-client';
import Router from './js/router';


class Application {
    constructor() {
        this.router = new Router();
    }
}

$(() => {
    new Application();
});