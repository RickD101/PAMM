const clientsData = [
    {
        name: 'ACME corporation',
        contact: 'Wil E Coyote',
        number: '0412 123 456',
        email: 'willy@acme.co',
        address: 'Middle of the desert'
    },
    {
        name: 'Lexcorp',
        contact: 'Lex Luthor',
        number: '0466 666 666',
        email: 'lexington@lexcorp.evil',
        address: 'Metropolis'
    },
    {
        name: 'S.H.I.E.L.D',
        contact: 'Nick Fury',
        number: '555 6785',
        email: 'littlenicky@shield.co.us',
        address: 'Trade secret'
    }
]

const assetsData = [
    {
        name: "Big Anvil",
        description: "It's metal and it's heavy",
        code: "ACME1",
        clientIndex: 0
    },
    {
        name: "Box of Dynamite",
        description: "Danger: explosive",
        code: "ACME2",
        clientIndex: 0
    },
    {
        name: "Krypto Laser",
        description: "Use in case of Superman",
        code: "LEXC1",
        clientIndex: 1
    },
    {
        name: "Kryptonian Spaceship",
        description: "Being researched",
        code: "LEXC2",
        clientIndex: 1
    },
    {
        name: "Robotic Butler",
        description: "At your service",
        code: "LEXC3",
        clientIndex: 1
    },
    {
        name: "Quinjet",
        description: "Advanced aerospace technology",
        code: "SHLD1",
        clientIndex: 2
    },
    {
        name: "Helicarrier",
        description: "Even more advanced than before",
        code: "SHLD2",
        clientIndex: 2
    },
    {
        name: "Captain America's Shield",
        description: "Vibranium and/or adamantium",
        code: "SHLD3",
        clientIndex: 2
    }
]

const componentsData = [
    {
        name: "Thruster Fan",
        description: "You lift me up",
        code: "SHLD4",
        assetIndex: 6
    },
    {
        name: "Nuclear drive",
        description: "Secret tech",
        code: "SHLD5",
        assetIndex: 6
    },
    {
        name: "Mainframe",
        description: "It's in the computer!",
        code: "SHLD6",
        assetIndex: 6
    }
]

const suppliersData = [
    {
        name: "Bunnings Warehouse",
        description: "General hardware",
        contact: "Michael Schneider",
        number: "(03) 8831 9777",
        email: "contact@bunnings.com.au",
        address: "16-18 Cato Street, Hawthorn East VIC 3123"
    },
    {
        name: "Blackwoods",
        description: "Industrial and safety supplies",
        contact: "Peter Kelly",
        number: "13 73 23",
        email: "websupport@blackwoods.com.au",
        address: "15 Dalmore Dr, Scoresby VIC 3179"
    },
    {
        name: "CBC",
        description: "Bearings and lubrication",
        contact: "Richard Jenman",
        number: "(02) 9709 3355",
        email: "support@conbear.com.au",
        address: "18 Worth Street, Chullora NSW 2190"
    },
    {
        name: "Renseal",
        description: "Seals, o-rings and gaskets",
        contact: "Mike Hunt",
        number: "(03) 9794 5711",
        email: "renseal@renhel.com.au",
        address: "43 Amberley Crescent, Dandenong VIC 3175"
    },
    {
        name: "Economy Bolt Company",
        description: "Fasteners etc.",
        contact: "Shannon Sweeney",
        number: "(03) 9793 3566",
        email: "salesd@economybolts.com.au",
        address: "89a Cheltenham Road, Dandenong VIC 3175"
    },
    {
        name: "Migwell",
        description: "Welding equipment and consumables",
        contact: "Seymour Butts",
        number: "1300 792 005",
        email: "sales@migwell.com.au",
        address: "88 Greens Road, Dandenong VIC 3175"
    }
]

const itemsData = [
    {
        description: "Red paint aerosol",
        category: "consumable",
        cost: 8.5,
        quantity: 12,
        code: "PAINT1",
        supplierIndex: 0
    },
    {
        description: "Grey paint aerosol",
        category: "consumable",
        cost: 11.89,
        quantity: 10,
        code: "PAINT2",
        supplierIndex: 0
    },
    {
        description: "Facemasks box",
        category: "consumable",
        cost: 50,
        quantity: 2,
        code: "PROT1",
        supplierIndex: 1
    },
    {
        description: "Gadus S2 v100 grease tube",
        category: "consumable",
        cost: 8.99,
        quantity: 6,
        code: "GADUS1",
        supplierIndex: 1
    },
    {
        description: "6430 bearing",
        category: "part",
        cost: 8.9,
        quantity: 20,
        code: "B-6430",
        supplierIndex: 2
    },
    {
        description: "UC220 bearing",
        category: "part",
        cost: 23.5,
        quantity: 3,
        code: "B-UC220",
        supplierIndex: 2
    },
    {
        description: "6305 bearing",
        category: "part",
        cost: 10.01,
        quantity: 13,
        code: "B-6305",
        supplierIndex: 2
    },
    {
        description: "TCAE-0 Thompson coupling",
        category: "part",
        cost: 89.9,
        quantity: 2,
        code: "C-TCAE0",
        supplierIndex: 2
    },
    {
        description: "MC-120 coupling",
        category: "part",
        cost: 42.4,
        quantity: 1,
        code: "C-MC120",
        supplierIndex: 2
    },
    {
        description: "TAC-2 aerosol",
        category: "consumable",
        cost: 12.5,
        quantity: 4,
        code: "TAC2",
        supplierIndex: 2
    },
    {
        description: "BS1806 204 o-ring",
        category: "part",
        cost: 0.2,
        quantity: 120,
        code: "O-204",
        supplierIndex: 3
    },
    {
        description: "BS1806 210 o-ring",
        category: "part",
        cost: 0.35,
        quantity: 35,
        code: "O-210",
        supplierIndex: 3
    },
    {
        description: "BS1806 309 o-ring",
        category: "part",
        cost: 0.8,
        quantity: 43,
        code: "O-309",
        supplierIndex: 3
    },
    {
        description: "BS1806 317 o-ring",
        category: "part",
        cost: 1.25,
        quantity: 17,
        code: "O-317",
        supplierIndex: 3
    },
    {
        description: "Small cylinder seal kit",
        category: "part",
        cost: 11.2,
        quantity: 2,
        code: "SKIT-1",
        supplierIndex: 3
    },
    {
        description: "M10x125mm bolt",
        category: "part",
        cost: 0.5,
        quantity: 180,
        code: "FS-M10a",
        supplierIndex: 4
    },
    {
        description: "M12x100mm bolt",
        category: "part",
        cost: 0.6,
        quantity: 120,
        code: "FS-M12a",
        supplierIndex: 4
    },
    {
        description: "M6x50mm caphead",
        category: "part",
        cost: 0.1,
        quantity: 250,
        code: "FS-M6a",
        supplierIndex: 4
    },
    {
        description: "Argon bottle refill",
        category: "consumable",
        cost: 25,
        code: "AR-REF",
        supplierIndex: 5
    },
    {
        description: "MIG wire spool",
        category: "consumable",
        cost: 15.8,
        quantity: 2,
        code: "WIRE-REF",
        supplierIndex: 5
    }
]

const proceduresData = [
    {
        description: "Standard safety procedure",
        category: "safety",
        procedure: [
            "Is your PPE suitable for the task?|y|0",
            "Are all appropriate electrical isolations applied?|y|0",
            "Are all appropriate mechanical isolations applied?|y|0",
            "Are all appropriate pneumatic/hydraulic isolations applied?|y|0",
            "Is the area sufficiently barricaded?|y|0",
            "Have you signed onto all relevant permits?|y|0",
            "Record any additional safety measures required:|n|3"
        ]
    }
]

const workersData = [
    {
        name: "Scoobert Doo",
        base_rate: 25,
        number: "0412 677 889",
        email: "scooby@mysteryinc.com"
    },
    {
        name: "Shaggy Rogers",
        base_rate: 42,
        number: "0420 420 420",
        email: "shaggy@mysteryinc.com"
    },
    {
        name: "Velma Dinkley",
        base_rate: 50,
        number: "0411 578 456",
        email: "velma@mysteryinc.com"
    },
    {
        name: "Fred Jones",
        base_rate: 45,
        number: "0433 578 934",
        email: "fred@mysteryinc.com"
    },
    {
        name: "Daphne Blake",
        base_rate: 45,
        number: "0422 347 890",
        email: "daphne@mysteryinc.com"
    },
    {
        name: "Scrappy Doo",
        base_rate: 22,
        number: "0412 324 487",
        email: "scrappy@mysteryinc.com"
    }
]

const routinesData = [
    {
        ownerIndex: 3,
        ownerModel: 'Asset',
        next_WO_gen: '2020-10-01',
        freq_WO_gen: '2.d',
        description: 'Research update delivery',
        procedure: [
            "Look at things with great interest",
            "Deliver a verbose and fantastical report on said things"
        ]
    },
    {
        ownerIndex: 5,
        ownerModel: 'Asset',
        next_WO_gen: '2020-10-06',
        freq_WO_gen: '12.w',
        description: 'Quarterly Quinjet service',
        procedureIndex: 1,
        procedure: [
            "Change oil",
            "Check brakes",
            "Check tyre pressures",
            "Check wing and prop condtions",
            "Clean filters"
        ]
    },
    {
        ownerIndex: 2,
        ownerModel: 'Component',
        next_WO_gen: '2020-09-29',
        freq_WO_gen: '1.m',
        description: 'Regular drive defrag',
        procedure: [
            "Restart computer",
            "Run: CMD>Defrag"
        ]
    },
]

module.exports = { 
    clientsData, 
    assetsData, 
    componentsData, 
    suppliersData, 
    itemsData, 
    proceduresData, 
    workersData,
    routinesData
}