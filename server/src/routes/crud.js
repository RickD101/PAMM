const express = require('express');
const router = express.Router();

// model inclusions
const Client   = require('../models/Client');
const Item     = require('../models/Item');
const Supplier = require('../models/Supplier');
const Worker   = require('../models/Worker');
const Asset    = require('../models/Asset');
const Routine  = require('../models/Routine');

// auth check
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).send({
            msg: 'Please login to access.'
        });
    }
});

// CREATE route
router.post('/create', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.create(req.body.data);
                break;
            case 'Item':
                data = await Item.create(req.body.data);
                break;
            case 'Supplier':
                data = await Supplier.create(req.body.data);
                break;
            case 'Worker':
                data = await Worker.create(req.body.data);
                break;
            case 'Asset':
                findClient = await Client.findOne({
                    _id: req.body.data.client
                });
                if (findClient) {
                    data = await Asset.create(req.body.data);
                }
                else {
                    throw 'Associated client not found.'
                }
                break;
            case 'Routine':
                findClient = await Asset.findOne({
                    _id: req.body.data.asset
                });
                if (findClient) {
                    data = await Routine.create(req.body.data);
                }
                else {
                    throw 'Associated asset not found.'
                }
                break;
        }

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' saved to database.'
            });
        }
        else {
            throw 'No matching model found.'
        }
    }
    catch (err) {
        res.status(400).send({
            msg: 'bad request.',
            err: err
        });
    }
});

// READ route
router.get('/read', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.find();
                break;
            case 'Item':
                data = await Item.find();
                break;
            case 'Supplier':
                data = await Supplier.find();
                break;
            case 'Worker':
                data = await Worker.find();
                break;
            case 'Asset':
                data = await Asset.find();
                break;
            case 'Routine':
                data = await Routine.find();
                break;
        }

        if (!data) {
            throw 'No matching model found.'
        }
        else if (!data[0]) {
            res.send({
                status: false,
                msg: 'No ' + req.body.model + 's found.'
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
        res.status(400).send({
            msg: 'bad request.',
            err: err
        });
    }
});

// UPDATE route
router.patch('/update', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
            case 'Item':
                data = await Item.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
            case 'Supplier':
                data = await Supplier.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
            case 'Worker':
                data = await Worker.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
            case 'Asset':
                data = await Asset.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
            case 'Routine':
                data = await Routine.findOneAndUpdate(
                    {
                        _id: req.body.id
                    },
                    req.body.data,
                    {new: true}
                );
                break;
        }

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' updated.'
            });
        }
        else {
            throw 'No matching model found.'
        }
    }
    catch (err) {
        res.status(400).send({
            msg: 'bad request.',
            err: err
        });
    }
});

// DELETE route
router.delete('/delete', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                const assocAssets = await Asset.find({
                    client: req.body.id
                });
                await Promise.all(
                    assocAssets.map(async (asset) => {
                        await Routine.deleteMany({
                            asset: asset._id
                        });
                    })
                );
                await Asset.deleteMany({
                    client: req.body.id
                })
                data = await Client.findOneAndDelete({
                    _id: req.body.id
                });
                break;
            case 'Item':
                data = await Item.findOneAndDelete({
                    _id: req.body.id
                });
                break;
            case 'Supplier':
                data = await Supplier.findOneAndDelete({
                    _id: req.body.id
                });
                break;
            case 'Worker':
                data = await Worker.findOneAndDelete({
                    _id: req.body.id
                });
                break;
            case 'Asset':
                await Routine.deleteMany({
                    asset: req.body.id
                })
                data = await Asset.findOneAndDelete({
                    _id: req.body.id
                });
                break;
            case 'Routine':
                data = await Routine.findOneAndDelete({
                    _id: req.body.id
                });
                break;
        }

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' deleted.'
            });
        }
        else {
            throw 'No matching model found.'
        }
    }
    catch (err) {
        res.status(400).send({
            msg: 'bad request.',
            err: err
        });
    }
});

module.exports = router;