// inclusions
const express = require('express');
const bcrypt  = require('bcryptjs');
const router  = express.Router();
const auth    = require('../auth');

// auth middleware
router.use(auth);

// model inclusions
const User = require('../models/User');
const generateAllWO = require('./nested_functions/generateAllWO');

// login status route
router.get('/', (req,res)=>{
    if (req.session.user){
        res.send({
            status: true,
            username: req.session.user.username
        });
    }
    else{
        res.send({
            status: false
        });
    }
});

router.get('/details', async (req,res)=>{
    try{
        // search for username availability
        const findUser = await User.findById(req.session.user.id);

        if (findUser) {
            res.send({
                status: true,
                data: {
                    username: findUser.username,
                    autogen: findUser.autogen
                }
            });
        }
        else {
            res.status(404).send({
                status: false,
                msg: 'Could not find user details.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }
});

// new user route
router.post('/new', async (req,res)=>{
    try{
        // search for username availability
        const findUsername = await User.findOne({
            username: req.body.username
        });

        if (!findUsername && req.body.password.length < 8){
            res.send({
                status: false,
                field: 'password',
                msg: 'Password must contain at least 8 characters.'
            });
        }
        else if (!findUsername){
            // encrypt password using bcryptjs
            req.body.password = await bcrypt.hash(req.body.password, 10);

            // create user with encrypted password
            const newUser = await User.create(req.body);
            res.send({
                status: true,
                msg: newUser.username + ' saved to database.'
            });
        }
        else{
            res.send({
                status: false,
                field: 'username',
                msg: findUsername.username + ' already exists, please select a different username.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }
});

// update password route
router.patch('/update', async (req,res)=>{
    try{
        const findUser = await User.findById(
            req.session.user.id
        );
        if (findUser) {
            if (await bcrypt.compare(req.body.password, findUser.password) && req.body.newPassword.length > 7) {
                req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
                await findUser.updateOne({
                    password: req.body.newPassword,
                    autogen: req.body.autogen
                }, {new: true, runValidators: true});
                res.send({
                    status: true,
                    msg: req.session.user.username + ' updated.'
                });
            }
            else if (req.body.newPassword.length < 8) {
                res.send({
                    status: false,
                    field: 'newPassword',
                    msg: 'Password must contain at least 8 characters.'
                });
            }
            else {
                res.status(404).send({
                    status: false,
                    field: 'password',
                    msg: 'Incorrect password.'
                });
            }
        }
        else {
            res.status(404).send({
                status: false,
                msg: 'User ID not found, try logging in again.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }
});

// user login route
router.post('/login', async (req,res)=>{
    try{
        const savedUser = await User.findOne({username: req.body.username});
        // check if user exists in database
        if (!savedUser){
            res.status(404).send({
                status: false,
                field: 'username',
                msg: req.body.username + ' not found.'
            });
        }
        // compare request password with hashed DB password
        else if (await bcrypt.compare(req.body.password, savedUser.password)){
            req.session.user = {
                username: savedUser.username,
                id: savedUser._id
            };
            if (savedUser.autogen) {
                const WOs = await generateAllWO(savedUser.autogen);
                if (WOs.status) {
                    res.send({
                        status: true,
                        notify: true,
                        notifyMsg: WOs.msg,
                        msg: savedUser.username + ' logged in.',
                        username: savedUser.username
                    });
                }
                else {
                    res.send({
                        status: true,
                        msg: savedUser.username + ' logged in.',
                        username: savedUser.username
                    });
                }
            }
            else {
                res.send({
                    status: true,
                    msg: savedUser.username + ' logged in.',
                    username: savedUser.username
                });
            }
        }
        else{
            res.status(404).send({
                status: false,
                field: 'password',
                msg: 'Incorrect password.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }
});

// user logout route
router.get('/logout', (req,res)=>{
    if (req.session.user){
        const currentUser = req.session.user.username;
        req.session.destroy(()=>{
            res.send({
                status: true,
                msg: currentUser + ' logged out.'
            });
        });
    }
    else{
        res.send({
            status: false,
            msg: 'Already logged out.'
        });
    }
});

// delete user and associated data route
router.delete('/delete', async (req,res)=>{
    try {
        const users = await User.find();
        if (users.length > 1) {
            await User.findByIdAndDelete(
                req.session.user.id
            );
            const username = req.session.user.username;
            req.session.destroy(()=>{
                res.send({
                    status: true,
                    msg: username + ' deleted.'
                });
            });
        }
        else {
            res.send({
                status: false,
                msg: 'At least one user must exist, please create another user before deleting the current user profile.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }

});

module.exports = router;