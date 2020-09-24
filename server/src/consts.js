// inclusions
require('dotenv').config();

// Express server port definition
const port = process.env.PORT || 4000;

// Session secret key
const key = process.env.SESSION_KEY || 'OnceUponATimeInDisneylandIMetMickeyMouse';

// Database name
const dbName = process.env.DB_NAME || 'PAMM'

module.exports = {port, key, dbName}