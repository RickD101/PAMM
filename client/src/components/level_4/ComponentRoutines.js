// package imports
import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// inclusions
import findOneCRUD from '../../api/crud/findOneCRUD';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '2rem'
    },
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

export default function ComponentRoutines() {
    const classes = useStyles();
    const { id } = useParams();

    const [componentData, setComponentData] = useState({asset: {client: {}}});
    const [dataPresent, setDataPresent] = useState(true);

    useEffect(() => {
        document.title = 'PAMM: Routine Management';

        findOneCRUD({model: "Component", id: id}).then((response)=>{
            if (response.status){
                setComponentData(response.data);
            }
            else {
                alert('Asset does not exist, redirecting to home...');
                setDataPresent(false);
            }
        }).catch((err)=>{
            alert(err);
        })
    }, [id]);

    return (
        <>
        {dataPresent ? 
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <h3>
                            <Link to="/" className={classes.breadcrumb}>Home</Link>
                            /<Link to="/clients" className={classes.breadcrumb}>Client Management</Link>
                            /<Link to={`/clients/assets/${componentData.asset.client._id}`} className={classes.breadcrumb}>
                                Asset Management for {componentData.asset.client.name}
                            </Link>
                            /<Link to={`/clients/assets/components/${componentData.asset._id}`} className={classes.breadcrumb}>
                                Component Management for {componentData.asset.name}
                            </Link>
                            /Routine Management for {componentData.name}
                        </h3>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>
                            <h1>Routines coming soon...</h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
            : <Redirect to='/'/>
        }
        </>
    )
}