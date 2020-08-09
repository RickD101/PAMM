const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Client',
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