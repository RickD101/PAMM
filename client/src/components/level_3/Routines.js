// package imports
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// inclusions
import MaterialTableComponent from '../general/MaterialTableComponent';
import findOneCRUD from '../../api/crud/findOneCRUD';
import findCRUD from '../../api/crud/findCRUD';
import updateCRUD from '../../api/crud/updateCRUD';
import ManageButtonNonLink from '../general/ManageButtonNonLink';
import ProcedureModal from '../routine/ProcedureModal';

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

const cellStyle = {textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}

export default function Routines() {
    const classes = useStyles();
    const { id } = useParams();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "owner", field: "owner", hidden: true},
        {title: "ownerModel", field: "ownerModel", hidden: true},
        {title: "procedure", field: "procedure", hidden: true},
        {title: "Description", field: "description", cellStyle: cellStyle},
        {title: "Frequency", field: "freq_WO_gen_number", type: 'numeric', cellStyle: cellStyle},
        {title: "Unit", field: "freq_WO_gen_unit", cellStyle: cellStyle, lookup: {d: 'days', w: 'weeks', m: 'months', y: 'years'}},
        {title: "Next generation", field: "next_WO_gen", type: 'date', cellStyle: cellStyle},
        {title: "Procedure", width: 100, sorting: false, render: 
            rowData => <ManageButtonNonLink
                onClick={() => handleOpen(rowData)}
                text="modify"/>}
    ];

    const [data, setData] = useState([]);
    const [assetData, setAssetData] = useState({client: {}});
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [desc, setDesc] = useState('');
    const [allData, setAllData] = useState({});
    const [dataPresent, setDataPresent] = useState(true);

    useEffect(() => {
        document.title = 'PAMM: Routine Management';

        findOneCRUD({model: "Asset", id: id}).then((response)=>{
            if (response.status){
                setAssetData(response.data);
            }
            else {
                alert('Asset does not exist, redirecting to home...');
                setDataPresent(false);
            }
        }).catch((err)=>{
            alert(err);
        })

        findCRUD({model: "Routine", searchFields: {owner: id}}).then((response)=>{
            setData(response.data);
        }).catch((err)=>{
            alert(err);
        });

    }, [id]);

    const handleOpen = (rowData) => {
        setOpen(true);
        setModalData(rowData.procedure);
        setDesc(rowData.description);
        setAllData(rowData);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const saveProcedureData = async () => {
        try {
            const response = await updateCRUD({
                model: 'Routine',
                id: allData._id,
                data: {...allData, procedure: modalData}
            });
            if (response) {
                if (response.status) {
                    setOpen(false);
                    const newData = [...data];
                    newData[allData.tableData.id].procedure = modalData;
                    setData(newData);
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
        <ProcedureModal
            open={open}
            onClose={handleClose}
            data={modalData}
            setData={setModalData}
            saveData={saveProcedureData}
            description={desc}
        />
        {dataPresent ?
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <h3>
                            <Link to="/" className={classes.breadcrumb}>Home</Link>
                            /<Link to="/clients" className={classes.breadcrumb}>Client Management</Link>
                            /<Link to={`/clients/assets/${assetData.client._id}`} className={classes.breadcrumb}>Asset Management for {assetData.client.name}</Link>
                            /Routine Management for {assetData.name}
                        </h3>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <MaterialTableComponent 
                    model={'Routine'}
                    title={`${assetData.name} Routines`}
                    columns={columns}
                    data={data}
                    setData={setData}
                    pageSize={12}
                    additionalFields = {{owner: assetData._id, ownerModel: 'Asset', procedure: []}}
                />
            </div>
            : <Redirect to='/'/>
        }
        </>
    )
}