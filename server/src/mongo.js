// inclusions
const mongoose = require('mongoose');
const consts  = require('./consts');

mongoose.connect(`mongodb://localhost:27017/${consts.dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${consts.dbName}`)
});
  
mongoose.connection.on('error', (err) => {
    console.log(err, 'Mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
    console.log('Mongoose disconnected')
});