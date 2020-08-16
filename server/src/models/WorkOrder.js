const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Client',
        required: true
    },
    asset: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Asset',
        required: true
    },
    expected_completion: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    actual_completion: {
        type: Date
    },
    description: {
        type: String
    },
    procedure: [{
        type: String
    }],
    labour: [{
        worker: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Worker'
        },
        rate: Number,
        description: String,
        hours: Number,
        multiplier: Number
    }],
    materials: [{
        item: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Item'
        },
        cost: Number,
        quantity: Number
    }]
});

module.exports = mongoose.model('WorkOrder', schema);