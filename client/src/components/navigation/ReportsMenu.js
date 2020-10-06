// package imports
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '24%',
        overflowY: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedActive: {
        paddingLeft: theme.spacing(4),
        backgroundColor: 'whitesmoke'
    },
}));

export default function ReportsMenu(props) {
    const classes = useStyles();
    const [open, setOpen] = useState({
        workOrder: true
    });

    const handleClick = (select) => {
        const openSetting = {...open};
        openSetting[select] = !openSetting[select]
        setOpen(openSetting);
    };

    const isActiveClass = (name) => {
        if (name === props.windowState) {
            return classes.nestedActive
        }
        else {
            return classes.nested
        }
    }

    return (
        <List
            component="nav"
            className={classes.root}
        >
            <ListItem 
                button 
                onClick={() => handleClick('workOrder')}
            >
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Work orders" />
                {open.workOrder ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.workOrder} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem 
                        button 
                        className={isActiveClass('manageWorkOrders')}
                        onClick={() => props.setWindowState('manageWorkOrders')}
                    >
                        <ListItemIcon>
                                <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage work orders" />
                    </ListItem>

                    <ListItem 
                        button 
                        className={isActiveClass('newWorkOrder')}
                        onClick={() => props.setWindowState('newWorkOrder')}
                    >
                        <ListItemIcon>
                                <AddToPhotosIcon />
                        </ListItemIcon>
                        <ListItemText primary="New work order" />
                    </ListItem>

                    <ListItem 
                        button 
                        className={isActiveClass('editWorkOrder')}
                        onClick={() => props.setWindowState('editWorkOrder')}
                    >
                        <ListItemIcon>
                                <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit work order" />
                    </ListItem>

                    <ListItem 
                        button
                        className={isActiveClass('workOrderSummary')}
                        onClick={() => props.setWindowState('workOrderSummary')}
                    >
                        <ListItemIcon>
                                <FormatListNumberedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Work order summary" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
