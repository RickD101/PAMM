// package imports
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// inclusions
import findOneCRUD from '../../api/crud/findOneCRUD';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        textDecoration: 'none',
    },
    navButtonText: {
        textDecoration: 'none',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        minHeight: '480px',
        color: theme.palette.text.secondary,
        background: 'lightgrey',
    },
}));

export default function Routines() {
    const classes = useStyles();
    const { id } = useParams();

    const [assetData, setAssetData] = useState({client: {}});

    useEffect(() => {
        document.title = 'PAMM: Routine Management';

        findOneCRUD({model: "Asset", id: id}).then((response)=>{
            setAssetData(response.data);
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h2>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /<Link to="/clients" className={classes.breadcrumb}>Client Management</Link>
                        /<Link to={`/clients/assets/${assetData.client._id}`} className={classes.breadcrumb}>Asset Management for {assetData.client.name}</Link>
                        /Routine Management for {assetData.name}
                    </h2>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <h1>Placeholder for routines</h1>
                    </Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </>
    )
}