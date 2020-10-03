// package imports
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Modal, TextField } from '@material-ui/core';
import ProcedureSteps from '../procedure/ProcedureSteps';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// inclusions
import readCRUD from '../../api/crud/readCRUD';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '60vw',
        height: '60vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 2),
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%,-50%)',
        outline: 0,
        borderRadius: 4
    },
    stepbox: {
        overflowY: 'scroll',
        height: '75%',
        border: 'lightgrey solid 1px',
        borderRadius: '4px',
    },
    button: {
        marginRight: 4,
        marginTop: 10,
        textDecoration: 'none'
    },
    procedureSelect: {
        marginRight: 4,
        width: '70%'
    }
}));

export default function ProcedureModal(props) {
    const classes = useStyles();

    const [procedureData, setProcedureData] = useState([]);
    const [procedure, setProcedure] = useState("");

    useEffect(() => {

        readCRUD({model: "Procedure"}).then((response)=>{
            setProcedureData(response.data);
        }).catch((err)=>{
            alert(err);
        })

    }, []);

    const handleChange = (event) => {
        setProcedure(event.target.value);
    }

    const addProcedure = () => {
        const newProc = [...props.data, ...procedure];
        props.setData(newProc);
    } 

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <div className={classes.root}>
                <h3>Modify {props.description} procedure:</h3>
                <div className={classes.stepbox}>
                <ProcedureSteps 
                    procedure={props.data}
                    setProcedure={props.setData}
                />
                </div>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.procedureSelect}
                            id="procedureSelect"
                            select
                            size="small"
                            value={procedure}
                            margin="dense"
                            variant="outlined"
                            label="Add saved procedures"
                            onChange={(event)=>handleChange(event)}
                        >
                            <MenuItem value="">
                                <em>(select)</em>
                            </MenuItem>
                            {procedureData &&
                                [
                                    <ListSubheader>Safety</ListSubheader>,
                                    procedureData.filter(proc => proc.category === 'safety').map(proc => (
                                        <MenuItem 
                                            key={proc._id} 
                                            value={proc.procedure}
                                        >
                                            {proc.description}
                                        </MenuItem>
                                    )),
                                    <ListSubheader>Work</ListSubheader>,
                                    procedureData.filter(proc => proc.category === 'work').map(proc => (
                                        <MenuItem 
                                            key={proc._id} 
                                            value={proc.procedure}
                                        >
                                            {proc.description}
                                        </MenuItem>
                                    )),
                                    <ListSubheader>Other</ListSubheader>,
                                    procedureData.filter(proc => proc.category === 'other').map(proc => (
                                        <MenuItem 
                                            key={proc._id} 
                                            value={proc.procedure}
                                        >
                                            {proc.description}
                                        </MenuItem>
                                    ))
                                ]
                            }
                        </TextField>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddCircleIcon />}
                            onClick={addProcedure}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={props.saveData}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                onClick={props.onClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    )
}