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

const findFn = async (body) => {
    switch (body.model) {
        case 'Client':
            data = await Client.find(body.searchFields);
            return data;

        case 'Item':
            data = await Item.find(body.searchFields).populate('supplier');
            return data;

        case 'Supplier':
            data = await Supplier.find(body.searchFields);
            return data;

        case 'Worker':
            data = await Worker.find(body.searchFields).populate({
                path: 'user_profile', select: ['username', 'role']
            });
            return data;

        case 'Procedure':
            data = await Procedure.find(body.searchFields);
            return data;

        case 'Asset':
            data = await Asset.find(body.searchFields).populate('client');
            return data;

        case 'Component':
            data = await Component.find(body.searchFields).populate({
                path: 'asset',
                populate: {path: 'client'}
            });
            return data;

        case 'Routine':
            data = await Routine.find(body.searchFields).populate('owner');
            return data;

        case 'WorkOrder':
            data = await WorkOrder.find(body.searchFields).populate(
                ['owner', 'scheduled', 'labour.worker', 'materials.item']
            );
            return data;

        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = findFn;