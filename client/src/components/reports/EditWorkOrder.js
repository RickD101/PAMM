// package imports
import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import UndoIcon from '@material-ui/icons/Undo';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// inclusions
import readCRUD from '../../api/crud/readCRUD';
import TabContainer from './TabContainer';
import updateCRUD from '../../api/crud/updateCRUD';
import NotificationModal from '../general/NotificationModal';
import findOneCRUD from '../../api/crud/findOneCRUD';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
    inputBox: {
        backgroundColor: 'none'
    },
    formTitle: {
        textAlign: 'left',
        padding: '0 0 8px 16px',
        color: 'black',
        fontSize: '1.2rem',
    },
    formButtons: {
        textAlign: 'right',
        color: 'black',
        fontSize: '1.2rem',
    },
    spacer: {
        height: 16,
        width: '100%'
    },
    topBar: {
        borderBottom: '1px solid grey',
        backgroundColor: 'inherit',
        width: '100%'
    },
    descriptionField: {
        marginTop: 8
    },
    button: {
        margin: 4,
    },
    listBox: {
        width: '100%',
    },
    paper: {
        padding: '8px 8px 0 8px', 
    }
}));

export default function EditWorkOrder(props) {
    const classes = useStyles();
    const blank = {
        client: '',
        owner: '',
        ownerModel: '',
        active: false,
        completed: false,
        description: '',
        expected_completion: new Date(),
        actual_completion: new Date(),
    }
    const blankErr = {client: false, owner: false, description: false}

    const [formState, setFormState] = useState(blank);
    const [procedure, setProcedure] = useState([]);
    const [labour, setLabour] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [cost, setCost] = useState({
        labourCost: 0,
        materialsCost: 0,
    });
    const [isError, setIsError] = useState(blankErr);
    const [modal, setModal] = useState({open: false, msg: '', status: ''});

    const [clientData, setClientData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [componentData, setComponentData] = useState([]);
    
    const [workerData, setWorkerData] = useState([]);
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        document.title = 'PAMM: Inventory Management';

        readCRUD({model: "Client"}).then((response)=>{
            setClientData(response.data);
        }).catch((err)=>{
            alert(err);
        })

        readCRUD({model: "Asset"}).then((response)=>{
            setAssetData(response.data);
        }).catch((err)=>{
            alert(err);
        })

        readCRUD({model: "Component"}).then((response)=>{
            setComponentData(response.data);
        }).catch((err)=>{
            alert(err);
        })

        readCRUD({model: "Worker"}).then((response)=>{
            setWorkerData(response.data);
        }).catch((err)=>{
            alert(err);
        })

        readCRUD({model: "Item"}).then((response)=>{
            setItemData(response.data);
        }).catch((err)=>{
            alert(err);
        })

        retrieveWorkOrderData();

    }, []);

    const retrieveWorkOrderData = () => {
        if (props.workOrderID) {
            findOneCRUD({model: "WorkOrder", id: props.workOrderID}).then((response)=>{
                if (response.status) {
                    const setData = {...blank}
                    for (const key in setData) {
                        setData[key] = response.data[key];
                    }

                    if (response.data.ownerModel === 'Asset') {
                        setData.client = response.data.owner.client._id
                    }
                    else if (response.data.ownerModel === 'Component') {
                        setData.client = response.data.owner.asset.client._id
                    }

                    setData.owner = response.data.owner._id;

                    const newCost = {...cost};
                    response.data.labour.forEach(entry => {
                        newCost.labourCost += entry.hours*entry.rate*entry.multiplier;
                    });
                    response.data.materials.forEach(entry => {
                        newCost.materialsCost += entry.cost*entry.quantity
                    });
                    setCost(newCost);

                    setFormState(setData);
                    setProcedure(response.data.procedure);
                    setLabour(response.data.labour);
                    setMaterials(response.data.materials);
                }
                else {
                    alert(response.msg);
                    props.setWorkOrderID('');
                }
            }).catch((err)=>{
                alert(err);
            })
        }
    }

    const saveForm = async () => {
        if (validateForm()) {
            try {
                const response = await updateCRUD({
                    model: 'WorkOrder',
                    id: props.workOrderID,
                    data: {
                        ...formState, 
                        procedure: procedure, 
                        labour: labour, 
                        materials: materials
                    }
                });
                if (response) {
                    if (response.status) {
                        setModal({
                            open: true,
                            msg: 'Work order successfully updated.',
                            status: 'good'
                        });
                    }
                    else {
                        throw new Error(`${response.msg}`);
                    }
                }
                else {
                    throw new Error(`The server failed to respond.`);
                }
            }
            catch (err) {
                alert(err);
            }
        }
    }

    const validateForm = () => {
        let formValid = true;
        let isErr = {...isError};

        for (const key in isError) {
            if (!formState[key]) {
                isErr[key] = true;
                formValid = false;
            }
        }

        setIsError(isErr);
        return formValid;
    }

    const resetForm = () => {
        retrieveWorkOrderData();
        setIsError(blankErr);
    }

    const returnToManage = () => {
        props.setWorkOrderID('');
        props.setWindowState('manageWorkOrders');
    }

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
        if (event.target.name === 'description') {
            setIsError({...isError, [event.target.name]: false});
        }
    };

    const handleClientChange = (event) => {
        const newFormState = {...formState};
        newFormState.owner = '';
        newFormState.client = event.target.value;
        setFormState(newFormState);
        setIsError({...isError, client: false});
    }

    const handleOwnerChange = (event) => {
        const newFormState = {...formState};
        newFormState.ownerModel = event.currentTarget.getAttribute('ownermodel');
        newFormState.owner = event.target.value;
        setFormState(newFormState);
        setIsError({...isError, owner: false});
    };

    const handleCheckboxChange = (event) => {
        if (event.target.name === 'active' && formState.completed) {
            if (!formState.active) {
                setFormState({ ...formState, active: true, completed: false });
            }
        }
        else if (event.target.name === 'completed' && formState.active) {
            if (!formState.completed) {
                setFormState({ ...formState, completed: true, active: false });
            }
        }
        else {
            setFormState({ ...formState, [event.target.name]: event.target.checked });
        }
    }

    const handleECDateChange = (date) => {
        setFormState({ ...formState, expected_completion: date });
    };

    const handleACDateChange = (date) => {
        setFormState({ ...formState, actual_completion: date });
    };

    return (
        <>
        <NotificationModal
            open={modal.open}
            msg={modal.msg}
            status={modal.status}
            setModal={setModal}
        />
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="baseline"
            className={classes.topBar}
        >
            <Grid item xs={6} className={classes.formTitle}>
                Edit existing work order
            </Grid>
            <Grid item xs={6} className={classes.formButtons}>
                {props.workOrderID ?
                    <>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={saveForm}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UndoIcon />}
                        onClick={resetForm}
                    >
                        Undo
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                        onClick={returnToManage}
                    >
                        Cancel
                    </Button>
                    </>
                    :
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AssignmentReturnIcon />}
                        onClick={returnToManage}
                    >
                        Manage work orders
                    </Button>
                }
                
            </Grid>
        </Grid>
        <div className={classes.spacer}></div>

        {props.workOrderID ?
        <>
        <Paper className={classes.paper}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
        >
            <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="clientField-label" error={isError.client}>
                        Client
                    </InputLabel>
                    <Select
                        labelId="clientField-label"
                        id="clientField"
                        name="client"
                        error={isError.client}
                        value={formState.client}
                        onChange={handleClientChange}
                        displayEmpty
                        className={classes.inputBox}
                    >
                        <MenuItem value="">
                            <em>(select)</em>
                        </MenuItem>
                        {clientData &&
                        clientData.map(client => (
                            <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="ownerField-label" error={isError.owner}>
                        Asset/Component
                    </InputLabel>
                    <Select
                        labelId="ownerField-label"
                        id="ownerField"
                        name="owner"
                        error={isError.owner}
                        value={formState.owner}
                        onChange={handleOwnerChange}
                        displayEmpty
                        className={classes.inputBox}
                    >
                        {formState.client 
                            ?
                            <MenuItem value="">
                                <em>(select)</em>
                            </MenuItem>
                            :
                            <MenuItem value="">
                                <em>(select client)</em>
                            </MenuItem>
                        }
                        
                        {(assetData && formState.client) &&
                            [
                                <ListSubheader>Assets</ListSubheader>,
                                assetData.filter(asset => asset.client._id === formState.client).map(asset => (
                                    <MenuItem key={asset._id} value={asset._id} ownermodel="Asset">
                                        {asset.name}
                                    </MenuItem>
                                ))
                            ]               
                        }
                        
                        {(componentData && formState.client) &&
                            [
                                <ListSubheader>Components</ListSubheader>,
                                componentData.filter(component => component.asset.client._id === formState.client).map(component => (
                                    <MenuItem key={component._id} value={component._id} ownermodel="Component">
                                        {component.asset.name} → {component.name}
                                    </MenuItem>
                                ))
                            ]
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formState.active}
                            onChange={handleCheckboxChange}
                            name="active"
                            color="primary"
                            className={classes.inputBox}
                        />
                    }
                    label="Active?"
                />
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formState.completed}
                            onChange={handleCheckboxChange}
                            name="completed"
                            color="primary"
                            className={classes.inputBox}
                        />
                    }
                    label="Completed?"
                />
            </Grid>
            <Grid item xs={6} className={classes.descriptionField}>
                <FormControl className={classes.formControl}>
                    <TextField 
                        id="descriptionField"
                        name="description"
                        label="Work description"
                        placeholder="Add description here"
                        error={isError.description}
                        value={formState.description}
                        onChange={handleChange}
                        className={classes.inputBox}
                        InputLabelProps={{ shrink: true }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="expected_completionField"
                                label="Expected completion"
                                value={formState.expected_completion}
                                onChange={handleECDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                    </MuiPickersUtilsProvider>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                disabled={!formState.completed}
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="actual_completionField"
                                label="Actual completion"
                                value={formState.actual_completion}
                                onChange={handleACDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                    </MuiPickersUtilsProvider>
                </FormControl>
            </Grid>
        </Grid>
        </Paper>
        <div className={classes.spacer}></div>
        <Grid 
                container
                className={classes.listBox}
                justify="flex-start"
            >
            <TabContainer
                procedure={procedure} 
                setProcedure={setProcedure}
                labour={labour}
                setLabour={setLabour}
                workerData={workerData}
                materials={materials}
                setMaterials={setMaterials}
                itemData={itemData}
                cost={cost}
                setCost={setCost}
            />   
        </Grid>
        </>
        :
        <h2 style={{marginTop: 220}}>Select a work order to edit from the Manage work orders screen</h2>
        }

        </>
    )
}