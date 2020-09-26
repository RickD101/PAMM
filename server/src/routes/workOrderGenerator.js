// package inclusions
const express = require('express');
const router = express.Router();

// functional inclusions
const generateAllWO = require('./nested_functions/generateAllWO');

router.post('/generate', async (req, res) => {
    try {
        const data = await generateAllWO(req.body.period);
        res.send(data);
    }
    catch (err) {
        sendError(err, res);
    }
})

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