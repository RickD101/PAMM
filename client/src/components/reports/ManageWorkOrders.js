// package imports
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';

// inclusions
import MaterialTableNonEdit from '../general/MaterialTableNonEdit';
import readCRUD from '../../api/crud/readCRUD';
import deleteCRUD from '../../api/crud/deleteCRUD';

const useStyles = makeStyles((theme) => ({
    formTitle: {
        textAlign: 'left',
        padding: '0 0 8px 16px',
        color: 'black',
        fontSize: '1.2rem',
    },
    spacer: {
        height: 16,
        width: '100%'
    },
    topBar: {
        borderBottom: '1px solid grey',
        backgroundColor: 'inherit',
        width: '100%',
        height: 45
    },
    activeBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: 'green'
    },
    completedBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: 'grey'
    },
    inactiveBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: 'lightgrey'
    }
}));

export default function ManageWorkOrders(props) {
    const classes = useStyles();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "active", field: "active", hidden: true},
        {title: "completed", field: "completed", hidden: true},
        {title: "Client", field: "owner.client.name", render: rowData => determineStatusAndClient(rowData)},
        {title: "Asset/Component", field: "owner.name"},
        {title: "Description", field: "description"},
        {title: "Due", field: "expected_completion", width: 80, type: "date"},
        {title: "Actions", sorting: false, width: 120, render: rowData => renderButtons(rowData)}
    ];

    // table data
    const [data, setData] = useState([]);

    const determineStatusAndClient = (data) => {
        let clientName = '';
        if (data.owner.client) {
            clientName = data.owner.client.name;
        }
        else if (data.owner.asset) {
            clientName = data.owner.asset.client.name;
        }

        if (data.active) {
            return <><div className={classes.activeBadge}/> {clientName}</>
        }
        else if (data.completed) {
            return <><div className={classes.completedBadge}/> {clientName}</>
        }
        else {
            return <><div className={classes.inactiveBadge}/> {clientName}</>
        }
    }

    const renderButtons = (data) => {
        return(
            <>
            <Tooltip title="View/Edit">
                <IconButton size="small" onClick={() => {editWorkOrder(data)}}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Print">
                <IconButton size="small" onClick={() => {printWorkOrder(data)}}>
                    <PrintIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton size="small" onClick={() => {deleteWorkOrder(data)}}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            </>
        )
    }

    const editWorkOrder = (data) => {
        alert('Coming soon...');
    }

    const printWorkOrder = (data) => {
        console.log(data);
        alert('Coming soon...');
    }

    const deleteWorkOrder = async (oldData) => {
        try {
            const response = await deleteCRUD({
                model: 'WorkOrder',
                id: oldData._id
            });
            if (response) {
                if (response.status) {
                    alert(response.msg);
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
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

    useEffect(() => {
        readCRUD({model: "WorkOrder"}).then((response)=>{
            setData(response.data);
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.topBar}
        >
            <Grid item xs={6} className={classes.formTitle}>
                Manage existing work orders
            </Grid>
            <Grid item xs={6}>
                
            </Grid>
        </Grid>
        
        <div className={classes.spacer}></div>
        
        <MaterialTableNonEdit
            title={'Work orders'}
            columns={columns}
            data={data}
            pageSize={8}
        />
        </>
    )
}