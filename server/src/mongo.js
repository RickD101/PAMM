const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PAMM', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected.')
});
  
mongoose.connection.on('error', (err) => {
    console.log(err, 'Mongoose failed to connect.')
});

mongoose.connection.on('disconncted', () => {
    console.log('Mongoose disconnected.')
});