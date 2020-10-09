// package imports
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// inclusions
import userNew from '../../api/user/userNew';
import userDelete from '../../api/user/userDelete';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export default function Settings(props) {
    const classes = useStyles();

    const [newUserForm, setNewUserForm] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });
    const [newUserFormError, setNewUserFormError] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });

    useEffect(() => {
        document.title = 'PAMM: Settings';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        const errorData = {...newUserFormError}
        for (const key in newUserForm) {
            if (!newUserForm[key]) {
                errorData[key] = 'This field is required.'
                isValid = false;
            }
        }


        if (newUserForm.password !== newUserForm.passwordConfirm) {
            errorData.password = 'Passwords do not match.';
            errorData.passwordConfirm = 'Passwords do not match.';
            isValid = false;
        }

        setNewUserFormError(errorData);

        if (isValid) {
            try {
                const response = await userNew({
                    username: newUserForm.username,
                    password: newUserForm.password
                })
                if (response.status) {
                    props.setModal({
                        open: true,
                        msg: response.msg,
                        status: 'good'
                    })
                }
                else {
                    setNewUserFormError({...newUserFormError, [response.field]: response.msg})
                }
            }
            catch (err) {
                alert(err);
            }
        }
    }

    const handleChange = (e) => {
        setNewUserForm({...newUserForm, [e.target.name]: e.target.value});
        setNewUserFormError({...newUserFormError,  [e.target.name]: ''});
    }

    const handleFocus = (e) => {
        setNewUserFormError({...newUserFormError,  [e.target.name]: ''});
    }

    const deleteUser = async () => {
        try {
            const response = await userDelete();
            if (response.status) {
                props.setModal({
                    open: true,
                    msg: response.msg,
                    status: 'good'
                });
                props.setLoginStatus(false);
            }
            else {
                props.setModal({
                    open: true,
                    msg: response.msg,
                    status: 'bad'
                });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
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
                        error={newUserFormError.username}
                        helperText={newUserFormError.username}
                        value={newUserForm.username}
                        onChange={handleChange}
                        onFocus={handleFocus}
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
                        error={newUserFormError.password}
                        helperText={newUserFormError.password}
                        value={newUserForm.password}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirm"
                        error={newUserFormError.passwordConfirm}
                        helperText={newUserFormError.passwordConfirm}
                        value={newUserForm.passwordConfirm}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        create new user
                    </Button>
                </form>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={deleteUser}
                    >
                        Delete Current user
                </Button>
            </div>
        </Container>
    );
}