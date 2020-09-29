// package imports
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// inclusions
import MaterialTableComponent from '../general/MaterialTableComponent';
import ManageButton from '../general/ManageButton';
import readCRUD from '../../api/crud/readCRUD';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '1rem'
    },
    breadcrumb: {
        textDecoration: 'none',
    },
    navButtonText: {
        textDecoration: 'none',
    }
}));

const cellStyle = {textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 100}

export default function Clients() {
    const classes = useStyles();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "Name", field: "name", cellStyle: cellStyle},
        {title: "Contact Name", field: "contact", cellStyle: cellStyle},
        {title: "Number", field: "number", cellStyle: cellStyle},
        {title: "Email", field: "email", cellStyle: cellStyle},
        {title: "Address", field: "address", cellStyle: cellStyle},
        {title: "Assets", sorting: false, render: 
            rowData => <ManageButton 
                linkTo={`/clients/assets/${rowData._id}`} 
                data={rowData} 
                passClass={classes.navButtonText}/>}
    ];

    // table data
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = 'PAMM: Client Management';

        readCRUD({model: "Client"}).then((response)=>{
            setData(response.data);
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h3>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /Client Management
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <MaterialTableComponent 
                model={'Client'}
                title={'Clients'}
                columns={columns}
                data={data}
                setData={setData}
                pageSize={12}
            />
        </div>
    )
}