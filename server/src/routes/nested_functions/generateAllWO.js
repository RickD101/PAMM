// model inclusions
const Routine   = require('../../models/Routine');
const WorkOrder = require('../../models/WorkOrder');

const generateAllWO = async (period = 7) => {
    period = periodValidator(period);

    const routines = await Routine.find();

    if (!routines) {
        throw {message: 'A database error has occurred.'}
    }
    else if (!routines[0]) {
        return {
            status: false,
            msg: 'No routines found.'
        }
    }
    else if (routines[0]) {
        const workOrders = [];
        let generateUntilDate = new Date();
        generateUntilDate.setDate(generateUntilDate.getDate() + period);
        await Promise.all(
            routines.map(async (routine) => {
                const WOs = await generateWO(routine, generateUntilDate);
                workOrders.push(...WOs);
            })
        )

        if (!workOrders[0]) {
            return {
                status: false,
                msg: `No work orders were generated for the next ${period} days.`
            }
        }
        else if (workOrders[0]) {
            return {
                status: true,
                msg: `${workOrders.length} work orders were generated for the next ${period} days.`,
                data: workOrders
            }
        }
    }
}

const generateWO = async (routine, date) => {
    let workOrders = [];
    
    let WOfreqDays;
    
    switch (routine.freq_WO_gen_unit) {
        case 'd':
            WOfreqDays = routine.freq_WO_gen_number*1;
            break;
        case 'w':
            WOfreqDays = routine.freq_WO_gen_number*7;
            break;
        case 'm':
            WOfreqDays = routine.freq_WO_gen_number*30;
            break;
        case 'y':
            WOfreqDays = routine.freq_WO_gen_number*365;
            break;
        default:
            throw {message: 'Routine provided invalid generation frequency.'}
    }

    while (routine.next_WO_gen < date) {
        let data = await WorkOrder.create({
            owner: routine.owner,
            ownerModel: routine.ownerModel,
            description: routine.description,
            active: true,
            completed: false,
            expected_completion: routine.next_WO_gen,
            scheduled: routine._id,
            procedure: routine.procedure
        });
        workOrders.push(JSON.parse(JSON.stringify(data)));
        routine.next_WO_gen.setDate(routine.next_WO_gen.getDate() + WOfreqDays);
    }

    await routine.updateOne({
        next_WO_gen: routine.next_WO_gen
    })

    return workOrders;
}

const periodValidator = (period) => {
    if (parseInt(period)) {
        return parseInt(period)
    }
    else {
        throw {message: 'Invalid period specified.'}
    }
}

module.exports = generateAllWO;