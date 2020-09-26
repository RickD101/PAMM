const mongoose = require('mongoose');

const freqValidator = (val) => {
    return /^(0{0,2}[1-9]|0?[1-9][0-9]|[1-9][0-9][0-9])(.)([dwmy])$/.test(val);
}

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
        validate: {
            validator: freqValidator,
            message: 'Invalid frequency format provided.'
        },
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