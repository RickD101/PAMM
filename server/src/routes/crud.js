const express = require('express');
const router = express.Router();

// model inclusions
const Client    = require('../models/Client');
const Item      = require('../models/Item');
const Supplier  = require('../models/Supplier');
const Worker    = require('../models/Worker');
const Asset     = require('../models/Asset');
const Routine   = require('../models/Routine');
const WorkOrder = require('../models/WorkOrder');

// auth check
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).send({
            status: false,
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
                let findClient = await Client.findOne({
                    _id: req.body.data.client
                });
                if (findClient) {
                    data = await Asset.create(req.body.data);
                }
                else {
                    throw new Error({_message: 'Associated client not found.'});
                }
                break;
            case 'Routine':
                let findAsset = await Asset.findOne({
                    _id: req.body.data.asset
                });
                if (findAsset) {
                    data = await Routine.create(req.body.data);
                }
                else {
                    throw new Error({_message: 'Associated asset not found.'});
                }
                break;
            case 'WorkOrder':
                let findClientWO = await Client.findOne({
                    _id: req.body.data.client
                });
                let findAssetWO = await Asset.findOne({
                    _id: req.body.data.asset
                });
                if (findAssetWO && findClientWO) {
                    data = await WorkOrder.create(req.body.data);
                }
                else {
                    throw new Error({_message: 'Associated client or asset not found.'});
                }
                break;
        }

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' saved to database.',
                id: data._id
            });
        }
        else {
            throw new Error({_message: 'No matching model found.'});
        }
    }
    catch (err) {
        let error = err
        if (err._message) {
            error = err._message;
        }
        else {
            error = 'Some required fields are missing.'
        }
        res.status(400).send({
            status: false,
            msg: error
        });
    }
});

// READ route
router.post('/read', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.find();
                break;
            case 'Item':
                data = await Item.find().populate('supplier');
                break;
            case 'Supplier':
                data = await Supplier.find();
                break;
            case 'Worker':
                data = await Worker.find().populate({path: 'user_profile', select: ['username', 'role']});
                break;
            case 'Asset':
                data = await Asset.find().populate('client');
                break;
            case 'Routine':
                data = await Routine.find().populate('asset');
                break;
            case 'WorkOrder':
                data = await WorkOrder.find().populate(['client', 'asset', 'labour.worker', 'materials.item']);
        }

        if (!data) {
            throw new Error({_message: 'No matching model found.'});
        }
        else if (!data[0]) {
            res.send({
                status: false,
                msg: `No ${req.body.model}s found.`,
                data: data
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
            status: false,
            msg: err._message
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
            case 'WorkOrder':
                data = await WorkOrder.findOneAndUpdate(
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
            throw new Error({_message: 'No matching model found.'});
        }
    }
    catch (err) {
        res.status(400).send({
            status: false,
            msg: err._message
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
            case 'WorkOrder':
                data = await WorkOrder.findOneAndDelete({
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
            throw new Error({_message: 'No matching model found.'});
        }
    }
    catch (err) {
        res.status(400).send({
            status: false,
            msg: err._message
        });
    }
});

// Search for one by ID
router.post('/findOne', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.findOne({
                    _id: req.body.id
                });
                break;
            case 'Item':
                data = await Item.findOne({
                    _id: req.body.id
                }).populate('supplier');
                break;
            case 'Supplier':
                data = await Supplier.findOne({
                    _id: req.body.id
                });
                break;
            case 'Worker':
                data = await Worker.findOne({
                    _id: req.body.id
                }).populate({path: 'user_profile', select: ['username', 'role']});
                break;
            case 'Asset':
                data = await Asset.findOne({
                    _id: req.body.id
                }).populate('client');
                break;
            case 'Routine':
                data = await Routine.findOne({
                    _id: req.body.id
                }).populate('asset');
                break;
            case 'WorkOrder':
                data = await WorkOrder.findOne({
                    _id: req.body.id
                }).populate(['client', 'asset', 'labour.worker', 'materials.item']);
                break;
        }

        if (data) {
            res.send({
                status: true,
                msg: req.body.model + ' found.',
                data: data
            });
        }
        else {
            throw new Error({_message: `No matching ${req.body.model} found.`});
        }
    }
    catch (err) {
        res.status(400).send({
            status: false,
            msg: err._message
        });
    }
});

// Search by field
router.post('/find', async (req, res) => {
    try {
        let data;
        switch (req.body.model) {
            case 'Client':
                data = await Client.find(req.body.searchFields);
                break;
            case 'Item':
                data = await Item.find(req.body.searchFields).populate('supplier');
                break;
            case 'Supplier':
                data = await Supplier.find(req.body.searchFields);
                break;
            case 'Worker':
                data = await Worker.find(req.body.searchFields).populate({path: 'user_profile', select: ['username', 'role']});
                break;
            case 'Asset':
                data = await Asset.find(req.body.searchFields).populate('client');
                break;
            case 'Routine':
                data = await Routine.find(req.body.searchFields).populate('asset');
                break;
            case 'WorkOrder':
                data = await WorkOrder.find(req.body.searchFields).populate(['client', 'asset', 'labour.worker', 'materials.item']);
        }

        if (!data) {
            throw new Error({_message: 'No matching model found.'});
        }
        else if (!data[0]) {
            res.send({
                status: false,
                msg: `No ${req.body.model}s found.`,
                data: data
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
            status: false,
            msg: err._message
        });
    }
});

module.exports = router;