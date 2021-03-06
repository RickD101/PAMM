// inclusions
const mongoose = require('mongoose');
const consts  = require('../consts');

let uri;
let db;
if (consts.environment === 'production') {
    uri = consts.dbProd;
    db = 'PAMM_Prod';
}
else {
    uri = `${consts.dbPath}${consts.dbName}`;
    db = consts.dbName;
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${db}`)
});
  
mongoose.connection.on('error', (err) => {
    console.log(err, 'Mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
    console.log('Mongoose disconnected')
});

module.exports = mongoose;