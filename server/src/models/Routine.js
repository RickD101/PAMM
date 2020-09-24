const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        refPath: 'ownerModel',
        required: true
    },
    ownerModel: {
        type: String,
        required: true,
        enum: ['Asset', 'Component'] 
    },
    next_WO_gen: {
        type: Date,
        required: true
    },
    freq_WO_gen: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    procedure: [{
        type: String
    }]
});

module.exports = mongoose.model('Routine', schema);