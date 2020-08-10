// package imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// inclusions
import getLoginStatus from './api/user/getLoginStatus';
import Login from './components/user/Login';
import Home from './components/level_one/Home';
import AppBarMenu from './components/navigation/AppBarMenu';
import Reports from './components/level_one/Reports';
import Clients from './components/level_one/Clients';
import Labour from './components/level_one/Labour';
import Inventory from './components/level_one/Inventory';

export default function App() {

    const [loginStatus, setLoginStatus] = useState('false');

    useEffect(() => {
        getLoginStatus().then((status) => {
            setLoginStatus(status);
        });
    });

    return (
        <Router>

            <AppBarMenu loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>

            <Switch>
                <Route exact path="/">
                    {loginStatus 
                        ? <Home />
                        : <Redirect to="/login"/>
                    }
                </Route>
                <Route exact path="/reports">
                    {loginStatus 
                        ? <Reports />
                        : <Redirect to="/login"/>
                    }
                </Route>
                <Route exact path="/clients">
                    {loginStatus 
                        ? <Clients />
                        : <Redirect to="/login"/>
                    }
                </Route>
                <Route exact path="/labour">
                    {loginStatus 
                        ? <Labour />
                        : <Redirect to="/login"/>
                    }
                </Route>
                <Route exact path="/inventory">
                    {loginStatus 
                        ? <Inventory />
                        : <Redirect to="/login"/>
                    }
                </Route>
                <Route exact path="/login">
                    {loginStatus 
                        ? <Redirect to="/"/>
                        : <Login setLoginStatus={setLoginStatus}/>
                    }
                </Route>
                <Route path="*">
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </Router>
    );
}