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
    description: {
        type: String,
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
    expected_completion: {
        type: Date,
        required: true
    },
    actual_completion: {
        type: Date
    },
    scheduled: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routine'
    },
    procedure: [{
        type: String
    }],
    labour: [{
        worker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Worker'
        },
        name: String,
        rate: Number,
        hours: Number,
        multiplier: Number,
        description: String
    }],
    materials: [{
        item: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Item'
        },
        description: String,
        cost: Number,
        quantity: Number
    }]
});

module.exports = mongoose.model('WorkOrder', schema);