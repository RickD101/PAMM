// package imports
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// inclusions
import userLogin from '../../api/user/userLogin';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        color: 'black',
        backgroundColor: '#BABABA',
        border: 'solid black 2px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        document.title = 'PAMM: Please Login';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length === 0 && password.length === 0) {
            setUsernameValid(false);
            setUsernameError('Please enter your username');
            setPasswordValid(false);
            setPasswordError('Please enter your password');
        }
        else if (username.length === 0) {
            setUsernameValid(false);
            setUsernameError('Please enter your username');
        }
        else if (password.length === 0) {
            setPasswordValid(false);
            setPasswordError('Please enter your password');
        }
        else if (password.length < 8) {
            setPasswordValid(false);
            setPasswordError('Your password must contain at least 8 characters');
        }
        else if (usernameValid && passwordValid) {
            const response = await userLogin({
                username: username,
                password: password
            });
            if (response.status) {
                props.setLoginStatus(true);
            }
            else if (response.field === 'username') {
                setUsernameError(response.msg);
                setUsernameValid(false);
            }
            else if (response.field === 'password') {
                setPasswordError(response.msg);
                setPasswordValid(false);
            }
            else {
                setUsernameError(response.msg);
                setUsernameValid(false);
                setPasswordError(response.msg);
                setPasswordValid(false);
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login to access PAMM
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        id="username"
                        autoFocus
                        error={!usernameValid}
                        helperText={usernameError}
                        value={username}
                        onChange={(e) => {setUsername(e.currentTarget.value); setUsernameValid(true); setUsernameError('')}}
                        onFocus={() => {setUsernameValid(true); setUsernameError('')}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={!passwordValid}
                        helperText={passwordError}
                        value={password}
                        onChange={(e) => {setPassword(e.currentTarget.value); setPasswordValid(true); setPasswordError('')}}
                        onFocus={() => {setPasswordValid(true); setPasswordError('')}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                </form>
            </div>
        </Container>
    );
}