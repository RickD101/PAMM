const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    description: {
        type: String
    },
    grouping: {
        type: String
    },
});

module.exports = mongoose.model('Asset', schema);