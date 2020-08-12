const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    category: {
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
    code: {
        type: String
    },
    quantity: {
        type: Number
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Supplier'
    }
});

module.exports = mongoose.model('Item', schema);