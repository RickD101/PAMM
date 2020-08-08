const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: [{
        name: String,
        number: Number,
        email: String
    }],
    code: {
        type: String
    }
});

module.exports = mongoose.model('Client', schema);