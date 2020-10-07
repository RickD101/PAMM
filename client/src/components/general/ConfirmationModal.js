// package imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Modal } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 10),
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%,-50%)',
        outline: 0,
        borderRadius: 4,
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
    spacing: {
        marginRight: 6
    },
    buttonContainer: {
        paddingTop: theme.spacing(2)
    }
}));

export default function ConfirmationModal(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.setModal({open: false, msg: '', confirmFunction: ''});
    };

    const handleConfirm = () => {
        props.confirmFunction();
        props.setModal({})
    }

    return (
    <Modal
        open={props.open}
        onClose={handleClose}
    >
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <HelpIcon color="primary" fontSize="large" className={classes.spacing}/>
                {props.msg}
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                className={classes.buttonContainer}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleConfirm}
                        endIcon={<CheckCircleIcon />}
                    >
                        Yes
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleClose}
                        endIcon={<CancelIcon />}
                    >
                        No
                    </Button>
                </Grid>
            </Grid>
        </div>
    </Modal>
    );
}