import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
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
    addStepBox: {
        width: '85%'
    },
    step: {
        borderBottom: 'solid darkgrey 1px'
    },
    titleField: {
        display: 'inline-block',
        color: 'black',
        marginLeft: '3%'
    },
    listItemPadding: {
        paddingRight: 50
    }
}));

export default function ProcedureTab(props) {
    const classes = useStyles();

    const [addStepOpen, setAddStepOpen] = useState(false);
    const [addStepData, setAddStepData] = useState('');

    const saveStepData = () => {
        const procedure = [...props.procedure];
        procedure.push(addStepData);
        props.setProcedure(procedure);
        setAddStepData('');
    }

    const deleteStep = (index) => {
        const procedure = [...props.procedure];
        procedure.splice(index, 1);
        props.setProcedure(procedure);
    }

    const promoteStep = (index) => {
        if (index !== 0) {
            const procedure = [...props.procedure];
            const step = procedure[index-1];
            procedure[index-1] = procedure[index];
            procedure[index] = step;
            props.setProcedure(procedure);
        }
    }

    const demoteStep = (index) => {
        const procedure = [...props.procedure];
        if (index !== procedure.length-1) {
            const step = procedure[index+1];
            procedure[index+1] = procedure[index];
            procedure[index] = step;
            props.setProcedure(procedure);
        }
    }

    return (
        <>
            <List className={classes.root}>
                {addStepOpen 
                    ?
                    <ListSubheader className={classes.listHeader}>
                        <TextField
                            className={classes.addStepBox}
                            label="Step details" 
                            id="stepField" 
                            size="small"
                            value={addStepData}
                            onChange={(event) => setAddStepData(event.target.value)}
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
                                    onClick={() => {setAddStepOpen(false); setAddStepData('')}}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                    :
                    <ListSubheader className={classes.listHeader}>
                        <Typography align="center" className={classes.titleField}>Detailed work procedure:</Typography>
                        <ListItemSecondaryAction>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setAddStepOpen(true)}
                            >
                                Add step
                            </Button>
                        </ListItemSecondaryAction>
                    </ListSubheader>
                }
                {props.procedure &&
                props.procedure.map((step, index) => {
                    return(
                        <ListItem key={`step-${index+1}`} dense className={classes.step}>
                            <ListItemText className={classes.listItemPadding}>{index+1}. {step}</ListItemText>
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
                                <Tooltip title="Delete">
                                    <IconButton size="small" onClick={() => deleteStep(index)}>
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