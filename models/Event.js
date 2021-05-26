const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    invites: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String, 
        min: 1,
        max: 100,
        required: true 
    },
    description: {
        type: String,
        max: 500
    },
    location: {
        type: String,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    },
    latitude: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    // https://attacomsian.com/blog/mongoose-schema-types#maps
    items: {
        type: Map,
        of: Boolean
    }
    
});

module.exports = Event = mongoose.model('event', EventSchema);