// package imports
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// inclusions

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '3rem 0 2rem 0',
        flexGrow: 1,
    },
    scheduleWindow: {
        height: '100%',
        boxSizing: 'border-box'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: 'inherit',
        boxSizing: 'inherit',
        color: theme.palette.text.secondary,
        background: 'lightgrey',
    },
    navButton: {
        padding: theme.spacing(2),
        fontSize: '1.3rem',
        minHeight: '100px',
    },
    navButtonIcon: {
        margin: theme.spacing(1),
        fontSize: '2.4rem',
    },
    navButtonText: {
        textDecoration: 'none',
    },
    placeholder: {
        margin: '200px 0'
    }
}));

export default function Home(props) {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'PAMM: Home Menu';
    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={1}></Grid>

                <Grid item xs={10}>
                    <Grid container direction="row" alignItems="stretch" spacing={1}>
                        <Grid item xs={12} md={3}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Link to="/reports" className={classes.navButtonText}>
                                        <Button
                                            className={classes.navButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            <AssessmentIcon className={classes.navButtonIcon}/> Reports
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to="/clients" className={classes.navButtonText}>
                                        <Button
                                            className={classes.navButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            <PersonIcon className={classes.navButtonIcon}/> Clients
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to="/labour" className={classes.navButtonText}>
                                        <Button
                                            className={classes.navButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            <BuildIcon className={classes.navButtonIcon}/> Labour
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to="/inventory" className={classes.navButtonText}>
                                        <Button
                                            className={classes.navButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            <ListAltIcon className={classes.navButtonIcon}/> Inventory
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to="/procedures" className={classes.navButtonText}>
                                        <Button
                                            className={classes.navButton}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            <PlaylistAddCheckIcon className={classes.navButtonIcon}/> Procedures
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            
                            <Grid item xs={12} className={classes.scheduleWindow}>
                                <Paper className={classes.paper}>
                                    <h1 className={classes.placeholder}>Interactive schedule coming soon...</h1>
                                </Paper>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}