// inclusions
const express    = require('express');
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const consts     = require('./consts');
const cors       = require('cors');
const mongoose   = require('./db/mongo'); // server setup JS inclusion

// set app
const app = express();

if (consts.environment === 'production') {
    // Use Express middleware to serve static files from the designated directory
    console.log('Express is running in production mode')
    app.use(express.static('./public'));
}

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

if (consts.environment === 'production') {
    // setting up to serve static files via Express in production
    app.get('/*', (req, res) => {
      res.sendFile('./public/index.html', { root: './' });
    })
}

// initialise backend server
app.listen(consts.port, () => console.log(`App listening at http://localhost:${consts.port}`));