// package imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import StorefrontIcon from '@material-ui/icons/Storefront';

// inclusions
import MaterialTableComponent from '../general/MaterialTableComponent';
import readCRUD from '../../api/crud/readCRUD';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '1rem'
    },
    breadcrumb: {
        textDecoration: 'none',
    },
    navButton: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        fontSize: '1.3rem',
        minHeight: '50px',
    },
    navButtonIcon: {
        margin: theme.spacing(1),
        fontSize: '2.4rem',
    },
    navButtonText: {
        textDecoration: 'none',
    }
}));

const cellStyle = {textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 100}

export default function Inventory() {
    const classes = useStyles();

    // table data
    const [data, setData] = useState([]);
    const [suppData, setSuppData] = useState({});

    // Item table columns
    const columns = [
        {title: "id", field: "_id", hidden: true},
        {title: "Description", field: "description", cellStyle: cellStyle},
        {title: "Category", field: "category", cellStyle: cellStyle, width: 130, lookup: {part: "part", consumable: "consumable", other: "other" }},
        {title: "Cost", field: "cost", type: "currency", cellStyle: cellStyle, width: 20},
        {title: "Quantity in Stock", field: "quantity", cellStyle: cellStyle, width: 130},
        {title: "Code", field: "code", cellStyle: cellStyle, width: 120},
        {title: "Supplier", field: "supplier._id", cellStyle: cellStyle, lookup: suppData}
    ];

    useEffect(() => {
        document.title = 'PAMM: Inventory Management';

        readCRUD({model: "Item"}).then((response)=>{
            setData(response.data);
        }).then(
            readCRUD({model: "Supplier"}).then((response)=>{
                if (response.data) {
                    const options = {};
                    response.data.map(supplier => {
                        options[supplier._id] = supplier.name;
                        return null;
                    });
                    setSuppData(options);
                }
        })).catch((err)=>{
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
                        /Inventory Management
                    </h3>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <MaterialTableComponent 
                model={'Item'}
                title={'Inventory in stock'}
                columns={columns}
                data={data}
                setData={setData}
                pageSize={10}
            />

            <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Link to="/inventory/suppliers" className={classes.navButtonText}>
                        <Button
                            className={classes.navButton}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            <StorefrontIcon className={classes.navButtonIcon}/> Manage Suppliers
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}