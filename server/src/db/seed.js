// inclusions
const mongoose = require('mongoose');
const consts   = require('../consts');
const bcrypt   = require('bcryptjs');

// model inclusions
const Client    = require('../models/Client');
const Item      = require('../models/Item');
const Supplier  = require('../models/Supplier');
const Worker    = require('../models/Worker');
const Asset     = require('../models/Asset');
const Component = require('../models/Component');
const Routine   = require('../models/Routine');
const Procedure = require('../models/Procedure');
const WorkOrder = require('../models/WorkOrder');
const User      = require('../models/User');

// data inclusions and definitions
const data = require(`./${consts.seedFile}`);

const models = [Client, Item, Supplier, Worker, Asset, Component, Routine, Procedure, WorkOrder, User];

let uri;
let db;
if (consts.environment === 'production') {
    uri = consts.dbProd;
    db = 'PAMM_Prod';
}
else {
    uri = `${consts.dbPath}${consts.dbName}`;
    db = consts.dbName;
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected',async () => {
    try {
        console.log(`Mongoose connected to ${db}`);
        console.log('Resetting database...')
        await Promise.all(
            models.map(async model => {
                await model.find().deleteMany();
            })
        )
        console.log('Database has been reset');
        await seedData();
        console.log('Data has been seeded');
        await mongoose.disconnect();
        console.log(`Mongoose disconnected from ${db}`);
    }
    catch (err) {
        console.log(err);
    }  
});

const seedData = async () => {
    console.log('Seeding data...');
    const clientIDs = [];
    const assetIDs = [];
    const componentIDs = [];
    const supplierIDs = [];

    const password = await bcrypt.hash('password', 10);
    await User.create({
        username: 'admin',
        password: password
    })
    
    await Promise.all(
        data.clientsData.map(async (client, i) => {
            const clientData = await Client.create(client);
            clientIDs[i] = clientData._id;
        })
    )

    await Promise.all(
        data.assetsData.map(async (asset, i) => {
            const assetData = await Asset.create({...asset, client: clientIDs[asset.clientIndex]});
            assetIDs[i] = assetData._id;
        })
    )

    await Promise.all(
        data.componentsData.map(async (component, i) => {
            const componentData = await Component.create({...component, asset: assetIDs[component.assetIndex]});
            componentIDs[i] = componentData._id;
        })
    )

    await Promise.all(
        data.suppliersData.map(async (supplier, i) => {
            const supplierData = await Supplier.create(supplier);
            supplierIDs[i] = supplierData._id;
        })
    )

    await Promise.all(
        data.itemsData.map(async (item) => {
            await Item.create({...item, supplier: supplierIDs[item.supplierIndex]});
        })
    )

    await Promise.all(
        data.proceduresData.map(async (procedure) => {
            await Procedure.create(procedure);
        })
    )

    await Promise.all(
        data.workersData.map(async (worker) => {
            await Worker.create(worker);
        })
    )

    await Promise.all(
        data.routinesData.map(async (routine) => {
            if (routine.ownerModel === 'Asset') {
                routine.owner = assetIDs[routine.ownerIndex];
            }
            else if (routine.ownerModel === 'Component') {
                routine.owner = componentIDs[routine.ownerIndex];
            }
            
            if (routine.procedureIndex) {
                routine.procedure = [
                    ...data.proceduresData[routine.procedureIndex-1].procedure, ...routine.procedure
                ];
            }

            await Routine.create(routine);
        })
    )
}