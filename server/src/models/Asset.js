const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Client',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        sparse: true
    },
});

module.exports = mongoose.model('Asset', schema);