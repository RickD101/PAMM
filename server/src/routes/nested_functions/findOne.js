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

const findOneFn = async (body) => {
    switch (body.model) {
        case 'Client':
            data = await Client.findOne({
                _id: body.id
            });
            return data;

        case 'Item':
            data = await Item.findOne({
                _id: body.id
            }).populate('supplier');
            return data;

        case 'Supplier':
            data = await Supplier.findOne({
                _id: body.id
            });
            return data;

        case 'Worker':
            data = await Worker.findOne({
                _id: body.id
            }).populate({path: 'user_profile', select: ['username', 'role']});
            return data;

        case 'Procedure':
            data = await Procedure.findOne({
                _id: body.id
            });
            return data;

        case 'Asset':
            data = await Asset.findOne({
                _id: body.id
            }).populate('client');
            return data;

        case 'Component':
            data = await Component.findOne({
                _id: body.id
            }).populate({
                path: 'asset',
                populate: {path: 'client'}
            });
            return data;

        case 'Routine':
            data = await Routine.findOne({
                _id: body.id
            }).populate('owner');
            return data;

        case 'WorkOrder':
            data = await WorkOrder.findOne({
                _id: body.id
            }).populate(
                ['scheduled', 'labour.worker', 'materials.item']
            ).populate({
                path: 'owner',
                populate: { path: 'asset', populate: { path: 'client' } }
            }).populate({
                path: 'owner',
                populate: { path: 'client' }
            });
            return data;

        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = findOneFn;