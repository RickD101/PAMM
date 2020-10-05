import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
    itemField: {
        width: '60%',
        paddingRight: 12,
        marginBottom: 4
    },
    costField: {
        width: '16%',
        paddingRight: 12
    },
    quantityField: {
        width: '16%',
        paddingRight: 12
    },
    costDisplay: {
        display: 'inline-block',
        width: '26%',
        color: 'black'
    },
}));

export default function MaterialsTab(props) {
    const classes = useStyles();
    const blank = {
        item: '',
        description: '',
        cost: '',
        quantity: ''
    }
    const blankErr = {item: false, cost: false, quantity: false}

    const [addEntryOpen, setAddEntryOpen] = useState(false);
    const [addEntryData, setAddEntryData] = useState(blank);
    const [isError, setIsError] = useState(blankErr);

    const saveEntryData = async () => {
        let formValid = true;
        let isErr = {...isError};

        for (const key in isError) {
            if (!addEntryData[key]) {
                isErr[key] = true;
                formValid = false;
            }
        }

        setIsError(isErr);

        if (formValid) {
            const materials = [...props.materials];
            materials.push(addEntryData);
            props.setMaterials(materials);
    
            const cost = {...props.cost};
            cost.materialsCost += parseFloat((addEntryData.cost*addEntryData.quantity).toFixed(2));
            props.setCost(cost);
    
            setAddEntryOpen(false);
            setAddEntryData(blank);
        }
    }

    const deleteEntry = (index) => {
        const materials = [...props.materials];
        const removedData = materials.splice(index, 1);
        props.setMaterials(materials);

        const cost = {...props.cost};
        cost.materialsCost -= parseFloat((removedData[0].cost*removedData[0].quantity).toFixed(2));
        props.setCost(cost);
    }

    const handleChange = (event) => {
        setAddEntryData({ ...addEntryData, [event.target.name]: event.target.value });
        setIsError({...isError, [event.target.name]: false});
    }

    const handleItemChange = (event) => {
        const newAddEntryData = {...addEntryData};
        newAddEntryData[event.target.name] = event.target.value;
        newAddEntryData.cost = event.currentTarget.getAttribute('cost');
        newAddEntryData.description = event.currentTarget.getAttribute('description');
        setAddEntryData(newAddEntryData);
        setIsError({...isError, item: false, cost: false});
    }

    return (
        <>
            <List className={classes.root}>
                {addEntryOpen 
                    ?
                    <ListSubheader className={classes.listHeader}>
                        <FormGroup row className={classes.addEntryBox}>
                            <FormControl className={classes.itemField}>
                                <InputLabel shrink id="itemField-label" error={isError.item}>
                                    Item
                                </InputLabel>
                                <Select
                                    labelId="itemField-label"
                                    id="itemField"
                                    name="item"
                                    error={isError.item}
                                    value={addEntryData.item}
                                    onChange={handleItemChange}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>(select)</em>
                                    </MenuItem>
                                    {props.itemData &&
                                    [
                                        <ListSubheader>Parts</ListSubheader>,
                                        props.itemData.filter(item => item.category === 'part').map(item => (
                                            <MenuItem 
                                                key={item._id} 
                                                value={item._id}
                                                cost={item.cost}
                                                description={item.description}
                                            >
                                                {item.description}
                                            </MenuItem>
                                        )),
                                        <ListSubheader>Consumables</ListSubheader>,
                                        props.itemData.filter(item => item.category === 'consumable').map(item => (
                                            <MenuItem 
                                                key={item._id} 
                                                value={item._id}
                                                cost={item.cost}
                                                description={item.description}
                                            >
                                                {item.description}
                                            </MenuItem>
                                        )),
                                        <ListSubheader>Other</ListSubheader>,
                                        props.itemData.filter(item => item.category === 'other').map(item => (
                                            <MenuItem 
                                                key={item._id} 
                                                value={item._id}
                                                cost={item.cost}
                                                description={item.description}
                                            >
                                                {item.description}
                                            </MenuItem>
                                        )),
                                    ]
                                    }
                                </Select>
                            </FormControl>
                            <FormControl className={classes.costField}>
                                <InputLabel htmlFor="costField" shrink error={isError.cost}>
                                    Cost per unit
                                </InputLabel>
                                <Input
                                    id="costField"
                                    name="cost"
                                    placeholder="0"
                                    readOnly
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    error={isError.cost}
                                    value={addEntryData.cost}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl className={classes.quantityField}>
                                <InputLabel htmlFor="quantityField" shrink error={isError.quantity}>
                                    Quantity
                                </InputLabel>
                                <Input
                                    id="quantityField"
                                    name="quantity"
                                    placeholder="0"
                                    error={isError.quantity}
                                    value={addEntryData.quantity}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </FormGroup>
                        <ListItemSecondaryAction>
                            <Tooltip title="Save">
                                <IconButton
                                    onClick={saveEntryData}
                                >
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton
                                    onClick={() => {
                                        setAddEntryOpen(false); 
                                        setAddEntryData(blank);
                                        setIsError(blankErr);
                                    }}
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
                                Add item
                            </Button>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                }
                {props.materials &&
                props.materials.map((entry, index) => {
                    return(
                        <ListItem key={`entry-${index+1}`} dense className={classes.step}>
                            <ListItemText>{entry.description}: {entry.quantity} @ ${parseFloat(entry.cost).toFixed(2)} totalling ${parseFloat(entry.cost*entry.quantity).toFixed(2)}</ListItemText>
                            <ListItemSecondaryAction>
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