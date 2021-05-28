const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./User');


const EventSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    invites: {

        type: String,
        // of: String
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
        type: Number
    },
    latitude: {
        type: Number
    },
    date: {
        type: String,
        required: true
        // type: Date,
        // required: true
    },
    items: {
        type: String
    }
    
});

module.exports = Event = mongoose.model('event', EventSchema);