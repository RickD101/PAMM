const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    base_rate: {
        type: Number,
        required: true
    },
    user_profile: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    email: {
        type: String
    },
    number: {
        type: Number
    }
});

module.exports = mongoose.model('Worker', schema);