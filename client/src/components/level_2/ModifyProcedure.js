// package imports
import React, { useState, useEffect } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

// inclusions
import findOneCRUD from '../../api/crud/findOneCRUD';
import ProcedureEditor from '../procedure/ProcedureEditor';
import updateCRUD from '../../api/crud/updateCRUD';
import NotificationModal from '../general/NotificationModal';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '1rem'
    },
    breadcrumb: {
        textDecoration: 'none',
    },
    navButtonText: {
        textDecoration: 'none',
    },
    displayPaneLeft: {
        height: 600,
        marginRight: 6,
        padding: '1rem',
        boxSizing: 'border-box'
    },
    displayPaneRight: {
        height: 600,
        marginLeft: 6,
        backgroundColor: 'whitesmoke'
    }
}));

export default function ModifyProcedure() {
    const classes = useStyles();
    const { id } = useParams();

    const [data, setData] = useState({description: '', category: '', procedure: []});
    const [dataPresent, setDataPresent] = useState(true);
    const [modal, setModal] = useState({open: false, msg: '', status: ''});

    useEffect(() => {
        document.title = 'PAMM: Procedure Management';

        findOneCRUD({model: "Procedure", id: id}).then((response)=>{
            if (response.status){
                setData(response.data);
            }
            else {
                alert('Procedure does not exist, redirecting to home...');
                setDataPresent(false);
            }
        }).catch((err)=>{
            alert(err);
        })
    }, [id]);

    const saveProcedure = async () => {
        try {
            const response = await updateCRUD({
                model: 'Procedure',
                id: id,
                data: data
            });
            if (response) {
                if (response.status) {
                    setModal({
                        open: true,
                        msg: 'Procedure successfully saved.',
                        status: 'good'
                    });
                }
                else {
                    throw new Error(`${response.msg}`);
                }
            }
            else {
                throw new Error(`The server failed to respond.`);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <>
        <NotificationModal
            open={modal.open}
            msg={modal.msg}
            status={modal.status}
            setModal={setModal}
        />
        {dataPresent ?
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <h3>
                            <Link to="/" className={classes.breadcrumb}>Home</Link>
                            /<Link to="/procedures" className={classes.breadcrumb}>
                                Procedure Management
                            </Link>
                            /Modify {data.description}
                        </h3>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container style={{margin: 0, width: '100%'}} spacing={0}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.displayPaneLeft} elevation={3}>
                            <ProcedureEditor 
                                data={data} 
                                setData={setData}
                                saveProcedure={saveProcedure}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.displayPaneRight} elevation={3}>
                            
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