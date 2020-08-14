// package imports
import React from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// inclusions
import updateCRUD from '../../api/crud/updateCRUD';
import createCRUD from '../../api/crud/createCRUD';
import deleteCRUD from '../../api/crud/deleteCRUD';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function MaterialTableComponent(props) {

    const handleRowUpdate = async (newData, oldData, resolve) => {
        try {
            const response = await updateCRUD({
                model: props.model,
                id: oldData._id,
                data: newData
            });
            if (response) {
                if (response.status) {
                    const dataUpdate = [...props.data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    props.setData([...dataUpdate]);
                    resolve();
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
            resolve();
        }
    }

    const handleRowAdd = async (newData, resolve) => {
        try {
            if (props.additionalFields){
                newData = {...newData, ...props.additionalFields}
            }
            const response = await createCRUD({
                model: props.model,
                data: newData
            });
            if (response) {
                if (response.status) {
                    newData._id = response.id;
                    const dataToAdd = [...props.data];
                    dataToAdd.push(newData);
                    props.setData(dataToAdd);
                    resolve();
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
            resolve();
        }
    }

    const handleRowDelete = async (oldData, resolve) => {
        try {
            const response = await deleteCRUD({
                model: props.model,
                id: oldData._id
            });
            if (response) {
                if (response.status) {
                    const dataDelete = [...props.data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    props.setData([...dataDelete]);
                    resolve();
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
            resolve();
        }
    }

    const handleBulkDelete = async (data, resolve) => {
        try {
            const deleteIDs = [];
            await Promise.all(
                data.map(async (selected) => {
                    const response = await deleteCRUD({
                        model: props.model,
                        id: selected._id
                    });
                    if (response) {
                        if (response.status) {
                            deleteIDs.push(selected._id);
                        }
                        else {
                            throw new Error(`${response.msg}`);
                        }
                    }
                    else {
                        throw new Error(`The server failed to respond.`);
                    }
                })
            )
            let dataDelete = [...props.data];
            deleteIDs.forEach(id => {
                dataDelete = dataDelete.filter(entry => entry._id !== id);
            });
            props.setData([...dataDelete]);
            resolve();
        }
        catch (err) {
            alert(err);
            resolve();
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <MaterialTable
                    title={props.title}
                    columns={props.columns}
                    data={props.data}
                    icons={tableIcons}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);
                            }),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                handleRowAdd(newData, resolve);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                handleRowDelete(oldData, resolve);
                            }),
                    }}
                    options={{
                        pageSize: props.pageSize,
                        pageSizeOptions: [],
                        selection: true
                    }}
                    actions={[
                        {
                            tooltip: `Remove All Selected ${props.model}s?`,
                            icon: tableIcons.Delete,
                            onClick: (evt, data) =>
                                new Promise((resolve) => {
                                    handleBulkDelete(data, resolve);
                                }),
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}