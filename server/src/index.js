// inclusions
const express    = require('express');
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const consts     = require('./consts');
const mongoose   = require('./db/mongo'); // server setup JS inclusion

// set app
const app = express();

// route inclusions
const userRouter      = require('./routes/user');
const crudRouter      = require('./routes/crud');
const workOrderRouter = require('./routes/workOrderGenerator');

// CORS allows requests to come in from React
app.use(cors());

// middleware
app.use(express.json());        // middleware for JSON parsing
app.use(session({               // session middleware
    secret: consts.key,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// auth check
app.use((req, res, next) => {
    if (req.session.user || req.path == '/user/login' || req.path == '/user') {
        next();
    }
    else {
        res.status(401).send({
            status: false,
            msg: 'Please login to access.'
        });
    }
});

// routes
app.use('/user', userRouter);
app.use('/crud', crudRouter);
app.use('/work', workOrderRouter);

// initialise backend server
app.listen(consts.port, () => console.log(`App listening at http://localhost:${consts.port}`));