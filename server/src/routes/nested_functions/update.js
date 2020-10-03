// model inclusions
const Client    = require('../../models/Client');
const Item      = require('../../models/Item');
const Supplier  = require('../../models/Supplier');
const Worker    = require('../../models/Worker');
const Asset     = require('../../models/Asset');
const Component = require('../../models/Component');
const Routine   = require('../../models/Routine');
const Procedure = require('../../models/Procedure');
const WorkOrder = require('../../models/WorkOrder');

const updateFn = async (body) => {
    switch (body.model) {
        case 'Client':
            data = await Client.findOneAndUpdate(
                {
                    _id: body.id
                },
                body.data,
                {new: true}
            );
            return data;

        case 'Item':
            data = await Item.findOneAndUpdate(
                {
                    _id: body.id
                },
                body.data,
                {new: true, runValidators: true}
            );
            return data;

        case 'Supplier':
            data = await Supplier.findOneAndUpdate(
                {
                    _id: body.id
                },
                body.data,
                {new: true, runValidators: true}
            );
            return data;

        case 'Worker':
            data = await Worker.findOneAndUpdate(
                {
                    _id: body.id
                },
                body.data,
                {new: true, runValidators: true}
            );
            return data;

        case 'Procedure':
            data = await Procedure.findOneAndUpdate(
                {
                    _id: body.id
                },
                body.data,
                {new: true, runValidators: true}
            );
            return data;

        case 'Asset':
            let findClient = await Client.findOne({
                _id: body.data.client
            });
            if (findClient) {
                data = await Asset.findOneAndUpdate(
                    {
                        _id: body.id
                    },
                    body.data,
                    {new: true, runValidators: true}
                );
                return data;
            }
            else {
                throw {message: 'Associated client not found, cannot update.'};
            }

        case 'Component':
            let findAsset = await Asset.findOne({
                _id: body.data.asset
            });
            if (findAsset) {
                data = await Component.findOneAndUpdate(
                    {
                        _id: body.id
                    },
                    body.data,
                    {new: true, runValidators: true}
                );
                return data;
            }
            else {
                throw {message: 'Associated asset not found, cannot update.'};
            }

        case 'Routine':
            if (body.data.asset) {
                let findAsset = await Asset.findOne({
                    _id: body.data.asset
                });
                if (findAsset) {
                    body.data.owner = body.data.asset;
                    body.data.ownerModel = 'Asset';
                    data = await Routine.findOneAndUpdate(
                        {
                            _id: body.id
                        },
                        body.data,
                        {new: true, runValidators: true}
                    );
                    return data;
                }
                else {
                    throw {message: 'Associated asset not found, cannot update.'};
                }
            }
            else if (body.data.component) {
                let findComponent = await Component.findOne({
                    _id: body.data.component
                });
                if (findComponent) {
                    body.data.owner = body.data.component;
                    body.data.ownerModel = 'Component';
                    data = await Routine.findOneAndUpdate(
                        {
                            _id: body.id
                        },
                        body.data,
                        {new: true, runValidators: true}
                    );
                    return data;
                }
                else {
                    throw {message: 'Associated component not found, cannot update.'};
                }
            }
            else {
                throw {message: 'Associated asset or component not found, cannot update.'};
            }

        case 'WorkOrder':
            if (body.data.asset) {
                let findAsset = await Asset.findOne({
                    _id: body.data.asset
                });
                if (findAsset) {
                    if (!completed) {
                        body.data.actual_completion = null
                    }
                    body.data.owner = body.data.asset;
                    body.data.ownerModel = 'Asset';
                    data = await WorkOrder.findOneAndUpdate(
                        {
                            _id: body.id
                        },
                        body.data,
                        {new: true, runValidators: true}
                    );
                    return data;
                }
                else {
                    throw {message: 'Associated asset not found, cannot update.'};
                }
            }
            else if (body.data.component) {
                let findComponent = await Component.findOne({
                    _id: body.data.component
                });
                if (findComponent) {
                    if (!completed) {
                        body.data.actual_completion = null
                    }
                    body.data.owner = body.data.component;
                    body.data.ownerModel = 'Component';
                    data = await WorkOrder.findOneAndUpdate(
                        {
                            _id: body.id
                        },
                        body.data,
                        {new: true, runValidators: true}
                    );
                    return data;
                }
                else {
                    throw {message: 'Associated component not found, cannot update.'};
                }
            }
            else {
                throw {message: 'Associated asset or component not found, cannot update.'};
            }
            
        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = updateFn;