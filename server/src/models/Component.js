const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Asset',
        required: true
    },
    name: {
        type: String,
        requied: true
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

module.exports = mongoose.model('Component', schema);