// inclusions
const mongoose = require('mongoose');
const consts  = require('../consts');

let uri;
if (consts.environment === 'production') {
    uri = consts.dbProd;
}
else {
    uri = `${consts.dbPath}${consts.dbName}`;
}

mongoose.connect(uri, {
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

module.exports = mongoose;