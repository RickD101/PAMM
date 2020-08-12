// package imports
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        textDecoration: 'none',
    },
}));


export default function Clients() {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'PAMM: Report Management';
    }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h2>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /Report Management
                    </h2>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    )
}