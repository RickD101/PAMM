// package imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// inclusions
import getLoginStatus from './api/user/getLoginStatus';
import Login from './components/user/Login';
import Home from './components/level_1/Home';
import AppBarMenu from './components/navigation/AppBarMenu';
import Reports from './components/level_1/Reports';
import Clients from './components/level_1/Clients';
import Labour from './components/level_1/Labour';
import Inventory from './components/level_1/Inventory';
import Suppliers from './components/level_2/Suppliers';
import Assets from './components/level_2/Assets';
import Routines from './components/level_3/Routines';
import Components from './components/level_3/Components';
import ComponentRoutines from './components/level_4/ComponentRoutines';
import MenuDrawer from './components/navigation/MenuDrawer';
import Procedures from './components/level_1/Procedures';
import ModifyProcedure from './components/level_2/ModifyProcedure';

export default function App() {

    const [loginStatus, setLoginStatus] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        getLoginStatus().then((response) => {
            setLoginStatus(response.status);
        }).catch((err)=>{
            alert(err);
        });
    });

    return (
        <Router>

            <AppBarMenu loginStatus={loginStatus} setLoginStatus={setLoginStatus} setMenuOpen={setMenuOpen}/>
            <MenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

            {loginStatus ?   
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/reports">
                        <Reports />
                    </Route>
                    <Route exact path="/clients">
                        <Clients />
                    </Route>
                    <Route exact path="/labour">
                        <Labour />
                    </Route>
                    <Route exact path="/inventory">
                        <Inventory />
                    </Route>
                    <Route exact path="/procedures">
                        <Procedures />
                    </Route>
                    <Route exact path="/inventory/suppliers">
                        <Suppliers />
                    </Route>
                    <Route path="/procedures/:id">
                        <ModifyProcedure />
                    </Route>
                    <Route path="/clients/assets/routines/:id">
                        <Routines />
                    </Route>
                    <Route path="/clients/assets/components/routines/:id">
                        <ComponentRoutines />
                    </Route>
                    <Route path="/clients/assets/components/:id">
                        <Components />
                    </Route>
                    <Route path="/clients/assets/:id">
                        <Assets />
                    </Route>
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
                : <Login setLoginStatus={setLoginStatus}/>
            }

        </Router>
    );
}