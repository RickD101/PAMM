// inclusions
require('dotenv').config();

// Express server port definition
const port = process.env.PORT || 4000;

// Session secret key
const key = process.env.SESSION_KEY || 'OnceUponATimeInDisneylandIMetMickeyMouse';

// Database variables
const dbName   = process.env.DB_NAME || 'PAMM'
const dbPath   = process.env.DB_PATH || 'mongodb://localhost:27017/'
const seedFile = process.env.DB_SEED || 'seedData'

module.exports = {port, key, dbName, dbPath, seedFile}