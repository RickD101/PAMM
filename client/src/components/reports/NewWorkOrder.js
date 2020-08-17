// package imports
import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// inclusions
import readCRUD from '../../api/crud/readCRUD';
import TabContainer from './TabContainer';
import createCRUD from '../../api/crud/createCRUD';

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

// eslint-disable-next-line
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

export default function NewWorkOrder(props) {
    const classes = useStyles();
    const blank = {
        client: '',
        asset: '',
        active: false,
        completed: false,
        description: 'Add work description here',
        expected_completion: new Date().yyyymmdd(),
        actual_completion: new Date().yyyymmdd(),
    }

    const [formState, setFormState] = useState(blank);
    const [procedure, setProcedure] = useState([]);
    const [labour, setLabour] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [cost, setCost] = useState({
        labourCost: 0,
        materialsCost: 0,
    })

    const [clientData, setClientData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    
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
    }, []);

    const saveForm = async () => {
        try {
            const response = await createCRUD({
                model: 'WorkOrder',
                data: {
                    ...formState, 
                    procedure: procedure, 
                    labour: labour, 
                    materials: materials
                }
            });
            if (response) {
                if (response.status) {
                    resetForm();
                    alert(response.msg);
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

    const resetForm = () => {
        setFormState(blank);
        setProcedure([]);
        setLabour([]);
        setMaterials([]);
        setCost({labourCost: 0, materialsCost: 0,});
    }

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleClientChange = (event) => {
        const newFormState = {...formState};
        newFormState.asset = '';
        newFormState.client = event.target.value;
        setFormState(newFormState);
    }

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
        setFormState({ ...formState, expected_completion: date.yyyymmdd() });
    };

    const handleACDateChange = (date) => {
        setFormState({ ...formState, actual_completion: date.yyyymmdd() });
    };

    return (
        <>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="baseline"
            className={classes.topBar}
        >
            <Grid item xs={6} className={classes.formTitle}>
                Create new work order
            </Grid>
            <Grid item xs={6} className={classes.formButtons}>
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
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={resetForm}
                >
                    Clear
                </Button>
            </Grid>
        </Grid>
        <div className={classes.spacer}></div>
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
                    <InputLabel shrink id="clientField-label">
                        Client
                    </InputLabel>
                    <Select
                        labelId="clientField-label"
                        id="clientField"
                        name="client"
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
                    <InputLabel shrink id="assetField-label">
                        Asset
                    </InputLabel>
                    <Select
                        labelId="assetField-label"
                        id="assetField"
                        name="asset"
                        value={formState.asset}
                        onChange={handleChange}
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
                        assetData.filter(asset => asset.client._id === formState.client).map(asset => (
                            <MenuItem key={asset._id} value={asset._id}>{asset.name}</MenuItem>
                        ))}   
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
                        value={formState.description}
                        onChange={handleChange}
                        className={classes.inputBox}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
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
    )
}