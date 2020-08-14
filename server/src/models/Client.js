const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    number: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Client', schema);