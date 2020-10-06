// package imports
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, Slider, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateIcon from '@material-ui/icons/Update';

// inclusions
import MaterialTableNonEdit from '../general/MaterialTableNonEdit';
import readCRUD from '../../api/crud/readCRUD';
import deleteCRUD from '../../api/crud/deleteCRUD';
import NotificationModal from '../general/NotificationModal';
import generateWorkOrders from '../../api/backendFunctions/generateWorkOrders';

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
    formButtons: {
        textAlign: 'right',
        color: 'black',
        fontSize: '1.2rem',
    },
    selectField: {
        width: '40%',
        marginRight: 6,
        textAlign: 'left',
    },
    activeBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: '#4caf50'
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
    },
    pastdueBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: '#ff9800'
    },
    overdueBadge: {
        display: 'inline-block',
        height: 12,
        width: 12,
        borderRadius: '50%',
        backgroundColor: '#f44336'
    },
    genButton: {
        marginTop: 12
    },
    slider: {
        marginTop: 12
    },
    buttonPadding: {
        paddingLeft: 12
    }
}));

const cellStyle = {textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 200}

const dayDiff = (date) => {
    const dt1 = new Date();
    const dt2 = new Date(date);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export default function ManageWorkOrders(props) {
    const classes = useStyles();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "active", field: "active", hidden: true},
        {title: "completed", field: "completed", hidden: true},
        {title: "Client", render: rowData => determineStatusAndClient(rowData), cellStyle: cellStyle},
        {title: "Asset/Component", field: "owner.name", cellStyle: cellStyle},
        {title: "Description", field: "description", cellStyle: cellStyle},
        {title: "Due", field: "expected_completion", width: 80, type: "date", defaultSort: "asc"},
        {title: "Actions", sorting: false, width: 120, render: rowData => renderButtons(rowData)}
    ];

    // table data
    const [data, setData] = useState([{owner: {}}]);
    const [filterData, setFilterData] = useState([]);

    const [clientData, setClientData] = useState([]);
    const [filter, setFilter] = useState({status: 'active', client: '(all)'});
    const [modal, setModal] = useState({open: false, msg: '', status: ''});
    const [daysToGen, setDaysToGen] = useState(7);

    const determineStatusAndClient = (data) => {
        let clientName = '';
        if (data.owner.client) {
            clientName = data.owner.client.name;
        }
        else if (data.owner.asset) {
            clientName = data.owner.asset.client.name;
        }

        if (data.active && dayDiff(data.expected_completion) < -7) {
            return (
                <>
                <Tooltip title="Overdue">
                    <div className={classes.overdueBadge}/>
                </Tooltip> {clientName}
                </>
            )
        }
        else if (data.active && dayDiff(data.expected_completion) < 0) {
            return (
                <>
                <Tooltip title="Past due">
                    <div className={classes.pastdueBadge}/>
                </Tooltip> {clientName}
                </>
            )
        }
        else if (data.active) {
            return (
                <>
                <Tooltip title="Active">
                    <div className={classes.activeBadge}/>
                </Tooltip> {clientName}
                </>
            )
        }
        else if (data.completed) {
            return (
                <>
                <Tooltip title="Completed">
                    <div className={classes.completedBadge}/>
                </Tooltip> {clientName}
                </>
            )
        }
        else {
            return (
                <>
                <Tooltip title="Inactive">
                    <div className={classes.inactiveBadge}/>
                </Tooltip> {clientName}
                </>
            )
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
        props.setWorkOrderID(data._id);
        props.setWindowState('editWorkOrder');
    }

    const printWorkOrder = (data) => {
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
                    setModal({
                        open: true,
                        msg: 'Work order successfully deleted.',
                        status: 'good'
                    });
                    
                    const newDat = [...data].filter(dat => dat._id !== oldData._id);
                    setData(newDat);

                    const newFilterDat = [...filterData].filter(dat => dat._id !== oldData._id);
                    setFilterData(newFilterDat);
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
            setModal({
                open: true,
                msg: 'Something went wrong.',
                status: 'bad'
            });
        }
    }

    const handleFilterChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
        let compare;
        let newFilterData;
        if (event.target.name === 'status'){
            newFilterData = data.filter(entry => {
                if (entry.active) {
                    compare = 'active'
                }
                else if (entry.completed) {
                    compare = 'completed'
                }
                else {
                    compare = 'inactive'
                }
    
                if (event.target.value !== '(all)') {
                    return compare === event.target.value;
                }
                else {
                    return entry;
                }
            }).filter(entry => {
                if (filter.client !== '(all)') {
                    let clientID = '';
                    if (entry.owner.client) {
                        clientID = entry.owner.client._id;
                    }
                    else if (entry.owner.asset) {
                        clientID = entry.owner.asset.client._id;
                    }
                    return clientID === filter.client;
                }
                else {
                    return entry;
                }
            });
        }
        else if (event.target.name === 'client'){
            newFilterData = data.filter(entry => {
                if (entry.active) {
                    compare = 'active'
                }
                else if (entry.completed) {
                    compare = 'completed'
                }
                else {
                    compare = 'inactive'
                }
    
                if (filter.status !== '(all)') {
                    return compare === filter.status;
                }
                else {
                    return entry;
                }
            }).filter(entry => {
                if (event.target.value !== '(all)') {
                    let clientID = '';
                    if (entry.owner.client) {
                        clientID = entry.owner.client._id;
                    }
                    else if (entry.owner.asset) {
                        clientID = entry.owner.asset.client._id;
                    }
                    return clientID === event.target.value;
                }
                else {
                    return entry;
                }
            });
        }
        
        setFilterData(newFilterData);
    }

    const performFilter = (dataToFilter) => {
        let compare;
        return dataToFilter.filter(entry => {
            if (filter.status !== '(all)') {
                if (entry.active) {
                    compare = 'active'
                }
                else if (entry.completed) {
                    compare = 'completed'
                }
                else {
                    compare = 'inactive'
                }
                return compare === filter.status;
            }
            else {
                return entry;
            }
        }).filter(entry => {
            if (filter.client !== '(all)') {
                let clientID = '';
                if (entry.owner.client) {
                    clientID = entry.owner.client._id;
                }
                else if (entry.owner.asset) {
                    clientID = entry.owner.asset.client._id;
                }
                return clientID === filter.client;
            }
            else {
                return entry;
            }
        });
    }

    const handleSliderChange = (event, newVal) => {
        setDaysToGen(newVal);
    }

    const sendGenRequest = async () => {
        try {
            const response = await generateWorkOrders(daysToGen);
            if (response.status) {
                setModal({
                    open: true,
                    msg: response.msg,
                    status: 'good'
                });
                setData([...data, ...response.data]);
                const fData = performFilter(response.data);
                setFilterData([...filterData, ...fData])
            }
            else {
                setModal({
                    open: true,
                    msg: response.msg,
                    status: 'bad'
                });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        readCRUD({model: "WorkOrder"}).then((response)=>{
            if (response.status) {
                setData(response.data);
                const fData = response.data.filter(entry => entry.active === true);
                setFilterData(fData);
            }
        }).catch((err)=>{
            alert(err);
        })

        readCRUD({model: "Client"}).then((response)=>{
            setClientData(response.data);
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <>
        <NotificationModal
            open={modal.open}
            msg={modal.msg}
            status={modal.status}
            setModal={setModal}
        />
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.topBar}
        >
            <Grid item xs={5} className={classes.formTitle}>
                Manage existing work orders
            </Grid>
            <Grid item xs={7} className={classes.formButtons}>
                <TextField
                    className={classes.selectField}
                    id="statusFilter"
                    name="status"
                    select
                    label="Filter by status"
                    value={filter.status}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleFilterChange}
                    variant="outlined"
                >
                    <MenuItem value="(all)">
                        <em>(all)</em>
                    </MenuItem>
                    {['active', 'inactive', 'completed'].map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    className={classes.selectField}
                    id="clientFilter"
                    name="client"
                    select
                    label="Filter by client"
                    value={filter.client}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleFilterChange}
                    variant="outlined"
                >
                    <MenuItem value="(all)">
                        <em>(all)</em>
                    </MenuItem>
                    {clientData &&
                    clientData.map(client => (
                        <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
        
        <div className={classes.spacer}></div>
        
        <MaterialTableNonEdit
            title={'Work orders'}
            columns={columns}
            data={filterData}
            pageSize={8}
        />

        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
        >
            <Grid item xs={7}>
                <Slider
                    className={classes.slider}
                    value={daysToGen}
                    onChange={handleSliderChange}
                    step={1}
                    min={1}
                    max={365}
                />
            </Grid>
            <Grid item xs={5} className={classes.buttonPadding}>
                <Button
                    className={classes.genButton}
                    variant="contained"
                    color="primary"
                    onClick={sendGenRequest}
                    endIcon={<UpdateIcon />}
                    fullWidth
                >
                    Generate work orders for {daysToGen} {daysToGen === 1 ? 'day' : 'days'}
                </Button>
            </Grid>
        </Grid>
        </>
    )
}