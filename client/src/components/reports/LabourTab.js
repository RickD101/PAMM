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
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

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
    },
    costDisplay: {
        display: 'inline-block',
        width: '26%',
        color: 'black'
    },
}));

export default function LabourTab(props) {
    const classes = useStyles();
    const blank = {
        worker: '',
        name: '',
        rate: '',
        hours: '',
        multiplier: ''
    }

    const [addEntryOpen, setAddEntryOpen] = useState(false);
    const [addEntryData, setAddEntryData] = useState(blank);

    const saveEntryData = () => {
        const labour = [...props.labour];
        labour.push(addEntryData);
        props.setLabour(labour);

        const cost = {...props.cost};
        cost.labourCost += addEntryData.hours*addEntryData.rate*addEntryData.multiplier;
        props.setCost(cost);

        setAddEntryData(blank);
    }

    const deleteEntry = (index) => {
        const labour = [...props.labour];
        const removedData = labour.splice(index, 1);
        props.setLabour(labour);

        const cost = {...props.cost};
        cost.labourCost -= removedData[0].hours*removedData[0].rate*removedData[0].multiplier;
        props.setCost(cost);
    }

    const editEntry = (index) => {
        alert('Still needs implementing!');
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
                                    readOnly
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
                                    type="number"
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
                            <Tooltip title="Save">
                                <IconButton
                                    onClick={() => {setAddEntryOpen(false); saveEntryData()}}
                                >
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton
                                    onClick={() => {setAddEntryOpen(false); setAddEntryData('')}}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                    :
                    <ListSubheader className={classes.listHeader}>
                        <Typography align="center" className={classes.costDisplay}>Total Cost: ${props.cost ? (props.cost.labourCost + props.cost.materialsCost).toFixed(2) : '0.00'}</Typography>
                        <Typography align="center" className={classes.costDisplay}>Labour Cost: ${props.cost ? (props.cost.labourCost).toFixed(2) : '0.00'}</Typography>
                        <Typography align="center" className={classes.costDisplay}>Materials Cost: ${props.cost ? (props.cost.materialsCost).toFixed(2) : '0.00'}</Typography>
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
                            <ListItemText>{entry.name} worked for {parseFloat(entry.hours).toFixed(2)} hours at ${parseFloat(entry.rate).toFixed(2)} p/h × {entry.multiplier} totalling ${(entry.hours*entry.rate*entry.multiplier).toFixed(2)}</ListItemText>
                            <ListItemSecondaryAction>
                                <Tooltip title="Edit">
                                    <IconButton size="small" onClick={() => editEntry(index)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton size="small" onClick={() => deleteEntry(index)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </>
    );
}