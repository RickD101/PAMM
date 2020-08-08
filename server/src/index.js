// inclusions
const express = require('express');
const session = require('express-session');
const consts  = require('./consts');
require('./mongo'); // server setup JS inclusion

// set app
const app = express();

// route inclusions
const userRouter = require('./routes/user');
const crudRouter = require('./routes/crud');

// middleware
app.use(express.json());        // middleware for JSON parsing
app.use(session({               // session middleware
    secret: consts.key,
    resave: false,
    saveUninitialized: false 
}));

// routes
app.use('/user', userRouter);
app.use('/crud', crudRouter);

// initialise backend server
app.listen(consts.port, () => console.log(`App listening at http://localhost:${consts.port}`));