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

export default function Procedures() {
    const classes = useStyles();

    // table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "Description", field: "description", cellStyle: cellStyle},
        {title: "Category", field: "category", cellStyle: cellStyle, lookup: {safety: "safety", work: "work", other: "other"}},
        {title: "Procedure", width: 100, sorting: false, render: 
            rowData => <ManageButton 
                linkTo={`/procedures/${rowData._id}`}
                text="modify"
                data={rowData} 
                passClass={classes.navButtonText}/>}
    ];

    // table data
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = 'PAMM: Procedure Management';

        readCRUD({model: "Procedure"}).then((response)=>{
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
                        /Procedure Management
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <MaterialTableComponent 
                model={'Procedure'}
                title={'Procedures'}
                columns={columns}
                data={data}
                setData={setData}
                pageSize={12}
            />
        </div>
    )
}