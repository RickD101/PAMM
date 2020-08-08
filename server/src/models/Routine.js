const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    asset: {
        type: String,
        required: true
    },
    initial: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    description: {
        type: String
    },
    procedure: [{
        type: String
    }]
});

module.exports = mongoose.model('Routine', schema);