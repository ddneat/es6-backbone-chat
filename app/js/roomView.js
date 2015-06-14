import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import RoomCollection from './roomCollection';
import IOSocket from './ioSocket.js';

export default class RoomView extends Backbone.View {
    constructor() {
        super({collection: RoomCollection});
    }

    // ClassName Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    className() {
        return 'room-list';
    }

    // tagName Property
    // -----
    // Backbone calls this function in the super constructor.
    // The returned object will be resolved and set as property.
    tagName() {
        return 'ul';
    }

    initialize() {
        this.listenTo(this.collection, 'all', this.render);

        this.template = _.template($('script[name="room"]').html());
    }

    render() {
        this.$el.html(this.template({
            rooms: this.collection.toJSON(),
            user: IOSocket.user
        }));

        return this;
    }
}