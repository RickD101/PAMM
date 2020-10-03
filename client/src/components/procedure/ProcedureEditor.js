import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ProcedureSteps from './ProcedureSteps';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'scroll',
        height: 455,
        border: 'lightgrey solid 1px',
        borderRadius: '4px',
        boxSizing: 'border-box',
        margin: '6px 3px'
    },
    formButtons: {
        textAlign: 'right',
        fontSize: '1.2rem',
    },
    button: {
        marginRight: 4,
        textDecoration: 'none'
    }
}));

export default function ProcedureEditor(props) {
    const classes = useStyles();

    const handleChange = (event) => {
        props.setData({ ...props.data, [event.target.name]: event.target.value });
    };

    const setProcedure = (procedure) => {
        props.setData({...props.data, procedure: procedure})
    }

    return (
        <>
        <Grid container spacing={1}>
            <Grid item xs={9}>
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={props.data.description}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    select
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={props.data.category}
                    onChange={handleChange}
                >
                    <MenuItem value={'safety'}>
                        safety
                    </MenuItem>
                    <MenuItem value={'work'}>
                        work
                    </MenuItem>
                    <MenuItem value={'other'}>
                        other
                    </MenuItem>
                </TextField>
            </Grid>
            <Grid className={classes.root} item xs={12}>
                <ProcedureSteps
                    procedure={props.data.procedure}
                    setProcedure={setProcedure}
                />
            </Grid>
            <Grid item xs={12} className={classes.formButtons}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={() => props.saveProcedure()}
                >
                    Save
                </Button>
                <Link to="/procedures" className={classes.button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                    >
                        Cancel
                    </Button>
                </Link>
            </Grid>
        </Grid>
        </>
    )
}