// package inclusions
const express = require('express');
const router = express.Router();

// functional inclusions
const createFn  = require('./nested_functions/create');
const readFn    = require('./nested_functions/read');
const updateFn  = require('./nested_functions/update');
const deleteFn  = require('./nested_functions/delete');
const findOneFn = require('./nested_functions/findOne');
const findFn    = require('./nested_functions/find');

// router.use((req, res, next) => {
//     console.log(req.body);
//     next();
// });

// CREATE route
router.post('/create', async (req, res) => {
    try {
        const data = await createFn(req.body);

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' saved.',
                id: data._id
            });
            console.log('\n', `${req.body.model} saved by ${req.session.user.username}:`)
            console.log(data);
        }
        else {
            throw {message: 'A database error has occurred.'};
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

// READ route
router.post('/read', async (req, res) => {
    try {
        const data = await readFn(req.body);
        
        if (!data) {
            throw {message: 'A database error has occurred.'};
        }
        else if (!data[0]) {
            res.send({
                status: false,
                msg: `No ${req.body.model}s found.`
            });
        }
        else if (data) {
            res.send({
                status: true,
                msg: data.length + ' ' + req.body.model + 's found.',
                data: data
            });
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

// UPDATE route
router.patch('/update', async (req, res) => {
    try {
        const data = await updateFn(req.body)

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' updated.',
                id: data.id
            });
            console.log('\n', `${req.body.model} updated by ${req.session.user.username}:`)
            console.log(data);
        }
        else if (data === null) {
            throw {message: `No ${req.body.model} with id: ${req.body.id} was found to update.`}
        }
        else {
            throw {message: 'A database error has occurred.'};
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

// DELETE route
router.delete('/delete', async (req, res) => {
    try {
        const data = await deleteFn(req.body)

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' deleted.'
            });
            console.log('\n', `${req.body.model} deleted by ${req.session.user.username}:`)
            console.log(data);
        }
        else if (data === null) {
            throw {message: `No ${req.body.model} with id: ${req.body.id} was found to delete.`}
        }
        else {
            throw {message: 'A database error has occurred.'};
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

// Search by ID
router.post('/findOne', async (req, res) => {
    try {
        const data = await findOneFn(req.body);

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' found.',
                data: data
            });
        }
        else if (data === null) {
            throw {message: `No ${req.body.model} with id: ${req.body.id} was found.`}
        }
        else {
            throw {message: 'A database error has occurred.'};
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

// Search by field
router.post('/find', async (req, res) => {
    try {
        const data = await findFn(req.body);

        if (!data) {
            throw {message: 'A database error has occurred.'};
        }
        else if (!data[0]) {
            res.send({
                status: false,
                msg: `No ${req.body.model}s found.`
            });
        }
        else if (data) {
            res.send({
                status: true,
                msg: data.length + ' ' + req.body.model + 's found.',
                data: data
            });
        }
    }
    catch (err) {
        sendError(err, res);
    }
});

const sendError = (err, res) => {
    let error
        if (err.message) {
            error = err.message;
        }
        else {
            error = 'A database error has occurred.'
        }
        res.status(400).send({
            status: false,
            msg: error
        });
}

module.exports = router;