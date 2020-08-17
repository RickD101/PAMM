// package imports
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// inclusions
import ReportsMenu from '../navigation/ReportsMenu';
import NewWorkOrder from '../reports/NewWorkOrder';
import ManageWorkOrders from '../reports/ManageWorkOrders';
import WorkOrderSummary from '../reports/WorkOrderSummary';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        textDecoration: 'none',
    },
    reportWindow: {
        padding: '8px 16px',
        textAlign: 'center',
        height: 600,
        width: '76%',
        color: theme.palette.text.secondary,
        background: 'whitesmoke',
        overflowY: 'auto'
    },
}));


export default function Clients() {
    const classes = useStyles();

    const [windowState, setWindowState] = useState('blank') 

    useEffect(() => {
        document.title = 'PAMM: Report Management';
    }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h3>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /Report Management
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Paper elevation={3}>
                        <Grid container>
                            <ReportsMenu windowState={windowState} setWindowState={setWindowState}/>
                            <Grid item className={classes.reportWindow}>
                                {windowState === 'blank' &&
                                    <h1 style={{marginTop: 250}}>Select an option</h1>
                                }
                                {windowState === 'newWorkOrder' &&
                                    <NewWorkOrder />
                                }
                                {windowState === 'manageWorkOrders' &&
                                    <ManageWorkOrders />
                                }
                                {windowState === 'workOrderSummary' &&
                                    <WorkOrderSummary />
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    )
}