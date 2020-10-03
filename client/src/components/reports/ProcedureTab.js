import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProcedureSteps from '../procedure/ProcedureSteps';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: 312,
        paddingTop: 0,
        paddingBottom: 0,
        borderTop: 'solid darkgrey 1px'
    },
}));

export default function ProcedureTab(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProcedureSteps procedure={props.procedure} setProcedure={props.setProcedure} />
        </div>
    );
}