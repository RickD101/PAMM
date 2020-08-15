import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StorefrontIcon from '@material-ui/icons/Storefront';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    navButton: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

export default function MenuDrawer(props) {
    const classes = useStyles();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        props.setMenuOpen(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        PAMM: Navigation Menu
                    </ListSubheader>
                }
            >
                <Divider />
                <Link to="/reports" className={classes.navButton}>
                    <ListItem button>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/clients" className={classes.navButton}>
                    <ListItem button>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Clients" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/labour" className={classes.navButton}>
                    <ListItem button>
                        <ListItemIcon><BuildIcon /></ListItemIcon>
                        <ListItemText primary="Labour" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/inventory" className={classes.navButton}>
                    <ListItem button>
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary="Inventory" />
                    </ListItem>
                </Link>
                <Link to="/inventory/suppliers" className={classes.navButton}>
                    <ListItem button>
                        <ListItemIcon><StorefrontIcon /></ListItemIcon>
                        <ListItemText primary="Suppliers" />
                    </ListItem>
                </Link>
                <Divider />
            </List>
        </div>
  );

  return (
    <div>
        <React.Fragment>
          <Drawer anchor="left" open={props.menuOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
