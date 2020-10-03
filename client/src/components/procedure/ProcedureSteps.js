import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    listItemPadding: {
        paddingRight: 80
    },
    spacing: {
        margin: '0 6px 0 12px'
    }
}));

export default function ProcedureSteps(props) {
    const classes = useStyles();
    const blank = {
        text: '',
        check: false,
        lines: 0
    }

    const [addStepOpen, setAddStepOpen] = useState(false);
    const [addStepData, setAddStepData] = useState(blank);
    const [editStepOpen, setEditStepOpen] = useState([]);

    const deleteStep = (index) => {
        const procedure = [...props.procedure];
        procedure.splice(index, 1);
        props.setProcedure(procedure);
    }

    const promoteStep = (index) => {
        setEditStepOpen([]);
        const procedure = [...props.procedure];
        if (index !== 0) {
            const step = procedure[index-1];
            procedure[index-1] = procedure[index];
            procedure[index] = step;
            props.setProcedure(procedure);
        }
    }

    const demoteStep = (index) => {
        setEditStepOpen([]);
        const procedure = [...props.procedure];
        if (index !== procedure.length-1) {
            const step = procedure[index+1];
            procedure[index+1] = procedure[index];
            procedure[index] = step;
            props.setProcedure(procedure);
        }
    }

    const editStep = (index) => {
        const newEditOpen = [...editStepOpen];
        newEditOpen[index] = !newEditOpen[index];
        setEditStepOpen(newEditOpen);
        console.log(newEditOpen);
    }

    const handleCheckboxChange = (event, index) => {
        const procedure = [...props.procedure];
        const stepSplit = procedure[index].split('|');

        if (event.target.checked === true) {
            stepSplit[1] = 'y';
        }
        else {
            stepSplit[1] = 'n';
        }

        procedure[index] = stepSplit.join('|');
        props.setProcedure(procedure);
    }

    const handleLinesChange = (event, index) => {
        const procedure = [...props.procedure];
        const stepSplit = procedure[index].split('|');

        stepSplit[2] = event.target.value

        procedure[index] = stepSplit.join('|');
        props.setProcedure(procedure);
    }

    const handleTextChange = (event, index) => {
        const procedure = [...props.procedure];
        const stepSplit = procedure[index].split('|');

        stepSplit[0] = event.target.value

        procedure[index] = stepSplit.join('|');
        props.setProcedure(procedure);
    }

    const textField = (text, index) => {
        return (
            <>
            { editStepOpen[index] ?
                <TextField
                    label="Step details" 
                    id={`stepField-${index}`} 
                    size="small"
                    fullWidth
                    value={text}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => handleTextChange(event, index)}
                />
                : text
            }
            </>
        )
    }
    
    const supplementFields = (check, lines, index) => {
        return (
            <>
            Add checkboxes
            <Checkbox
                id={`checkbox-${index}`}
                size="small"
                checked={check}
                onChange={(event)=>handleCheckboxChange(event, index)}
                color="primary"
            />
            <span className={classes.spacing}>Add blank lines</span>
            <TextField
                id={`lines-${index}`}
                select
                size="small"
                value={lines}
                margin="dense"
                onChange={(event)=>handleLinesChange(event, index)}
            >
                {[0,1,2,3,4,5].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            </>
        )
    }

    const handleNewCheckboxChange = (event) => {
        setAddStepData({...addStepData, check: event.target.checked})
    }

    const handleNewLinesChange = (event) => {
        setAddStepData({...addStepData, lines: event.target.value})
    }

    const handleNewTextChange = (event) => {
        setAddStepData({...addStepData, text: event.target.value})
    }

    const saveStepData = () => {
        const procedure = [...props.procedure];
        const newStepData = [addStepData.text, 'n', addStepData.lines];
        addStepData.check ? newStepData[1] = 'y' : newStepData[1] = 'n'
        procedure.push(newStepData.join('|'));
        props.setProcedure(procedure);
        setAddStepData(blank);
    }

    const newTextField = (text) => {
        return (
            <TextField
                label="Step details" 
                id={`stepField-new`} 
                size="small"
                fullWidth
                value={text}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event) => handleNewTextChange(event)}
            />
        )
    }

    const newSupplementFields = (check, lines) => {
        return (
            <>
            Add checkboxes
            <Checkbox
                id={`checkbox-new`}
                size="small"
                checked={check}
                onChange={(event)=>handleNewCheckboxChange(event)}
                color="primary"
            />
            <span className={classes.spacing}>Add blank lines</span>
            <TextField
                id={`lines-new`}
                select
                size="small"
                value={lines}
                margin="dense"
                onChange={(event)=>handleNewLinesChange(event)}
            >
                {[0,1,2,3,4,5].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            </>
        )
    }

    return (
        <>
        <List>
            {props.procedure.map((step, index) => {
                const stepSplit = step.split('|');
                let check;
                stepSplit[1] === 'y' ? check = true : check = false
                let lines = parseInt(stepSplit[2]);

                return (
                    <ListItem key={index} dense>
                        <ListItemText 
                            className={classes.listItemPadding}
                            id={`item-${index}`} 
                            primary={textField(stepSplit[0], index)} 
                            secondary={supplementFields(check, lines, index)} 
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="Promote">
                                <IconButton size="small" onClick={() => promoteStep(index)}>
                                    <ArrowUpwardIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Demote">
                                <IconButton size="small" onClick={() => demoteStep(index)}>
                                    <ArrowDownwardIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            { editStepOpen[index] ?
                                <Tooltip title="Close edit">
                                    <IconButton size="small" onClick={() => editStep(index)}>
                                        <DoneIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Edit text">
                                    <IconButton size="small" onClick={() => editStep(index)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip> 
                            }
                            <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => deleteStep(index)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
            {addStepOpen 
                ?
                <ListItem>
                    <ListItemText 
                        className={classes.listItemPadding}
                        id={`item-new`} 
                        primary={newTextField(addStepData.text)} 
                        secondary={newSupplementFields(addStepData.check, addStepData.lines)} 
                    />
                    <ListItemSecondaryAction>
                        <Tooltip title="Save">
                            <IconButton
                                onClick={() => {setAddStepOpen(false); saveStepData()}}
                            >
                                <DoneIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton
                                onClick={() => {setAddStepOpen(false); setAddStepData(blank)}}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
                :
                <ListItem>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={() => setAddStepOpen(true)}
                        >
                            Add step
                        </Button>
                </ListItem>
            }
        </List>
        </>
    )
}