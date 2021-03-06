// package imports
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// inclusions
import userLogout from '../../api/user/userLogout'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 64
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    home: {
        textDecoration: 'none',
        color: 'inherit',
    }
}));

export default function AppBarMenu(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {props.loginStatus &&
                        <IconButton 
                            edge="start" 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="menu"
                            onClick={() => props.setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.home}>
                            PAMM: The Plant/Asset Maintenance Manager
                        </Link>
                    </Typography>
                    {props.loginStatus &&
                        <Button 
                            color="inherit" 
                            onClick={()=>{userLogout(); props.setLoginStatus(false)}}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
