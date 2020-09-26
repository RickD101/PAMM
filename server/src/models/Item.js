const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['part', 'consumable', 'other']
    },
    cost: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Supplier'
    },
    code: {
        type: String,
        unique: true,
        sparse: true
    },
});

module.exports = mongoose.model('Item', schema);