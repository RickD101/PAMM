const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: { // to be of category safety, work or other
        type: String,
        required: true
    },
    procedure: [{
        type: String
    }]
});

module.exports = mongoose.model('Procedure', schema);