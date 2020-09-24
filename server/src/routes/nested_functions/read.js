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

const readFn = async (body) => {
    switch (body.model) {
        case 'Client':
            data = await Client.find();
            return data;

        case 'Item':
            data = await Item.find().populate('supplier');
            return data;

        case 'Supplier':
            data = await Supplier.find();
            return data;

        case 'Worker':
            data = await Worker.find().populate({path: 'user_profile', select: ['username', 'role']});
            return data;

        case 'Procedure':
            data = await Procedure.find();
            return data;

        case 'Asset':
            data = await Asset.find().populate('client');
            return data;

        case 'Component':
            data = await Component.find().populate({
                path: 'asset',
                populate: {path: 'client'}
            });
            return data;

        case 'Routine':
            data = await Routine.find().populate('owner');
            return data;

        case 'WorkOrder':
            data = await WorkOrder.find().populate(['owner', 'scheduled', 'labour.worker', 'materials.item']);
            return data;

        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = readFn;