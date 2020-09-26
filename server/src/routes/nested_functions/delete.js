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

const deleteFn = async (body) => {
    switch (body.model) {
        case 'Client':
            const assocAssets = await Asset.find({
                client: body.id
            });
            await Promise.all(
                assocAssets.map(async (asset) => {
                    await Routine.deleteMany({
                        owner: asset._id
                    });
                    await WorkOrder.deleteMany({
                        owner: asset._id
                    })
                    const assocComponents = await Component.find({
                        asset: asset._id
                    })
                    await Promise.all(
                        assocComponents.map(async (component) => {
                            await Routine.deleteMany({
                                owner: component._id
                            });
                            await WorkOrder.deleteMany({
                                owner: component._id
                            });
                        })
                    )
                    await Component.deleteMany({
                        asset: asset._id
                    })
                })
            );
            await Asset.deleteMany({
                client: body.id
            })
            data = await Client.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Item':
            data = await Item.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Supplier':
            data = await Supplier.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Worker':
            data = await Worker.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Procedure':
            data = await Procedure.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Asset':
            await Routine.deleteMany({
                owner: body.id
            })
            await WorkOrder.deleteMany({
                owner: body._id
            });
            const assocComponents = await Component.find({
                asset: body._id
            })
            await Promise.all(
                assocComponents.map(async (component) => {
                    await Routine.deleteMany({
                        owner: component._id
                    });
                    await WorkOrder.deleteMany({
                        owner: component._id
                    });
                })
            )
            await Component.deleteMany({
                asset: asset._id
            })
            data = await Asset.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Component':
            await Routine.deleteMany({
                owner: body.id
            })
            await WorkOrder.deleteMany({
                owner: body._id
            });
            data = await Component.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'Routine':
            data = await Routine.findOneAndDelete({
                _id: body.id
            });
            return data;

        case 'WorkOrder':
            data = await WorkOrder.findOneAndDelete({
                _id: body.id
            });
            return data;
            
        default:
            throw {message: `No matching model found for ${body.model}.`};
    }
}

module.exports = deleteFn;