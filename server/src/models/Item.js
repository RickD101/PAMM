const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    category: { // to be of category part or consumable
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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