// package imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// inclusions
import MaterialTableComponent from '../general/MaterialTableComponent';
import readCRUD from '../../api/crud/readCRUD';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
        textDecoration: 'none',
    },
}));

export default function Labour() {
    const classes = useStyles();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "Name", field: "name"},
        {title: "Base Rate", field: "base_rate", type: "currency"},
        {title: "Number", field: "number"},
        {title: "Email", field: "email"}
    ];

    // table data
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = 'PAMM: Labour Management';

        readCRUD({model: "Worker"}).then((response)=>{
            setData(response.data);
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <h3>
                        <Link to="/" className={classes.breadcrumb}>Home</Link>
                        /Labour Management
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            
            <MaterialTableComponent 
                model={'Worker'}
                title={'Workers'}
                columns={columns}
                data={data}
                setData={setData}
                pageSize={8}
            />
        </>
    )
}