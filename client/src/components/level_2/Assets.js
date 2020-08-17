// package imports
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// inclusions
import MaterialTableComponent from '../general/MaterialTableComponent';
import ManageButton from '../general/ManageButton';
import findOneCRUD from '../../api/crud/findOneCRUD';
import findCRUD from '../../api/crud/findCRUD';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        textDecoration: 'none',
    },
    navButtonText: {
        textDecoration: 'none',
    }
}));


export default function Assets() {
    const classes = useStyles();
    const { id } = useParams();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "client", field: "client", hidden: true},
        {title: "Name", field: "name"},
        {title: "Description", field: "description"},
        {title: "Grouping", field: "grouping"},
        {title: "Routines", render: 
            rowData => <ManageButton 
                linkTo={`/clients/assets/routines/${rowData._id}`} 
                data={rowData} 
                passClass={classes.navButtonText}/>},
    ];

    // table data
    const [data, setData] = useState([]);
    const [clientData, setClientData] = useState({});

    useEffect(() => {
        document.title = 'PAMM: Asset Management';

        findOneCRUD({model: "Client", id: id}).then((response)=>{
            setClientData(response.data);
        }).catch((err)=>{
            alert(err);
        });

        findCRUD({model: "Asset", searchFields: {client: id}}).then((response)=>{
            setData(response.data);
        }).catch((err)=>{
            alert(err);
        })

    }, [id]);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h3>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /<Link to="/clients" className={classes.breadcrumb}>Client Management</Link>
                        /Asset Management for {clientData.name}
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <MaterialTableComponent 
                model={'Asset'}
                title={`${clientData.name} Assets`}
                columns={columns}
                data={data}
                setData={setData}
                pageSize={10}
                additionalFields = {{client: clientData._id}}
            />
        </>
    )
}