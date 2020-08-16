import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: 312,
        paddingTop: 0,
        paddingBottom: 0
    },
    listHeader: {
        textAlign: 'left',
        backgroundColor: 'inherit',
        borderBottom: 'solid darkgrey 1px',
        borderTop: 'solid darkgrey 1px'
    },
    addEntryBox: {
        width: '85%'
    },
    step: {
        borderBottom: 'solid darkgrey 1px'
    },
    workerField: {
        width: '45%',
        paddingRight: 12,
        marginBottom: 4
    },
    rateField: {
        width: '16%',
        paddingRight: 12
    },
    hoursField: {
        width: '16%',
        paddingRight: 12
    },
    multiField: {
        width: '16%'
    }
}));

export default function LabourTab(props) {
    const classes = useStyles();
    const blank = {
        worker: '',
        name: '',
        rate: '',
        description: '',
        hours: '',
        multiplier: ''
    }

    const [addEntryOpen, setAddEntryOpen] = useState(false);
    const [addEntryData, setAddEntryData] = useState(blank);
    const [totalCost, setTotalCost] = useState(0);

    const saveEntryData = () => {
        const labour = [...props.labour];
        labour.push(addEntryData);
        props.setLabour(labour);
        setAddEntryData(blank);
    }

    const deleteEntry = (index) => {
        const procedure = [...props.procedure];
        procedure.splice(index, 1);
        props.setProcedure(procedure);
    }

    const editEntry = (index) => {
        if (index !== 0) {
            const procedure = [...props.procedure];
            const step = procedure[index-1];
            procedure[index-1] = procedure[index];
            procedure[index] = step;
            props.setProcedure(procedure);
        }
    }

    const handleChange = (event) => {
        setAddEntryData({ ...addEntryData, [event.target.name]: event.target.value });
    }

    const handleWorkerChange = (event) => {
        const newAddEntryData = {...addEntryData};
        newAddEntryData[event.target.name] = event.target.value;
        newAddEntryData.rate = event.currentTarget.getAttribute('rate');
        newAddEntryData.name = event.currentTarget.getAttribute('actual_name');
        setAddEntryData(newAddEntryData);
    }

    return (
        <>
            <List className={classes.root}>
                {addEntryOpen 
                    ?
                    <ListSubheader className={classes.listHeader}>
                        <FormGroup row className={classes.addEntryBox}>
                            <FormControl className={classes.workerField}>
                                <InputLabel shrink id="workerField-label">
                                    Worker
                                </InputLabel>
                                <Select
                                    labelId="workerField-label"
                                    id="workerField"
                                    name="worker"
                                    value={addEntryData.worker}
                                    onChange={handleWorkerChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>(select)</em>
                                    </MenuItem>
                                    {props.workerData &&
                                    props.workerData.map((worker) => (
                                        <MenuItem 
                                            key={worker._id} 
                                            value={worker._id}
                                            rate={worker.base_rate}
                                            actual_name={worker.name}
                                        >
                                            {worker.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.rateField}>
                                <InputLabel htmlFor="rateField">Base rate</InputLabel>
                                <Input
                                    id="rateField"
                                    name="rate"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={addEntryData.rate}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl className={classes.hoursField}>
                                <InputLabel htmlFor="hoursField">Hours</InputLabel>
                                <Input
                                    id="hoursField"
                                    name="hours"
                                    placeholder="0"
                                    value={addEntryData.hours}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl className={classes.multiField}>
                                <InputLabel shrink id="multiplierField-label">
                                    Multiplier
                                </InputLabel>
                                <Select
                                    labelId="multiplierField-label"
                                    id="multiplierField"
                                    name="multiplier"
                                    value={addEntryData.multiplier}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>(select)</em>
                                    </MenuItem>
                                    {[1, 1.5, 2].map((multi) => (
                                        <MenuItem 
                                            key={`multi-${multi}`} 
                                            value={multi}
                                        >
                                            {multi} ×
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {setAddEntryOpen(false); saveEntryData()}}
                            >
                                <DoneIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {setAddEntryOpen(false); setAddEntryData('')}}
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                    :
                    <ListSubheader className={classes.listHeader}>
                        Total Labour Cost: ${totalCost}
                        <ListItemSecondaryAction>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setAddEntryOpen(true)}
                            >
                                Add labour
                            </Button>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                }
                {props.labour &&
                props.labour.map((entry, index) => {
                    return(
                        <ListItem key={`entry-${index+1}`} dense className={classes.step}>
                            <ListItemText>{entry.name} worked for {entry.hours} hours at ${entry.rate} p/h × {entry.multiplier} totalling: ${entry.hours*entry.rate*entry.multiplier}</ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => editEntry(index)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => deleteEntry(index)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </>
    );
}