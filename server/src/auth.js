const express = require('express');
const auth     = express();

// auth check
auth.use((req, res, next) => {
    if (req.session.user || req.path == '/login' || req.path == '/') {
        next();
    }
    else {
        res.status(401).send({
            status: false,
            msg: 'Please login to access.'
        });
    }
});

module.exports = auth;