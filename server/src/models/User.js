const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    autogen: {
        type: Number
    },
    role: String //optional extension for later
});

module.exports = mongoose.model('User', schema);