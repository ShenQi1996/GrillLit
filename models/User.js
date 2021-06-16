const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ------
// const LikesSchema = new Schema ({
//     eventId: {
//         type: String
//     },
// })
// ------

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: {
        type: Schema.Types.ObjectId,
        ref: 'events'
    },
    likes: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = User = mongoose.model('users', UserSchema);