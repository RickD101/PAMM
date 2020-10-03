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

const createFn = async (body) => {
    let findOwner;
    switch (body.model) {
        case 'Client':
            data = await Client.create(body.data);
            return data;

        case 'Item':
            data = await Item.create(body.data);
            return data;

        case 'Supplier':
            data = await Supplier.create(body.data);
            return data;

        case 'Worker':
            data = await Worker.create(body.data);
            return data;

        case 'Procedure':
            data = await Procedure.create(body.data);
            return data;

        case 'Asset':
            let findClient = await Client.findOne({
                _id: body.data.client
            });
            if (findClient) {
                data = await Asset.create(body.data);
                return data;
            }
            else {
                throw {message: 'Associated client not found.'};
            }

        case 'Component':
            let findAsset = await Asset.findOne({
                _id: body.data.asset
            });
            if (findAsset) {
                data = await Component.create(body.data);
                return data;
            }
            else {
                throw {message: 'Associated asset not found.'};
            }

        case 'Routine':
            if (body.data.ownerModel === 'Asset') {
                findOwner = await Asset.findOne({
                    _id: body.data.owner
                });
            }
            else if (body.data.ownerModel === 'Component') {
                findOwner = await Component.findOne({
                    _id: body.data.owner
                });
            }
            else {
                throw {message: 'Owner model is incorrectly defined or missing.'};
            }

            if (findOwner) {
                    data = await Routine.create(body.data);
                    return data;
            }
            else {
                throw {message: `Associated ${body.data.ownerModel} not found.`};
            }

        case 'WorkOrder':
            if (body.data.ownerModel === 'Asset') {
                findOwner = await Asset.findOne({
                    _id: body.data.owner
                });
            }
            else if (body.data.ownerModel === 'Component') {
                findOwner = await Component.findOne({
                    _id: body.data.owner
                });
            }
            else {
                throw {message: 'Owner model is incorrectly defined or missing.'};
            }
                
            if (findOwner) {
                if (!body.data.completed && body.data.actual_completion) {
                    delete body.data.actual_completion
                }
                data = await WorkOrder.create(body.data);
                return data;
            }
            else {
                throw {message: `Associated ${body.data.ownerModel} not found.`};
            }
            
        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = createFn;