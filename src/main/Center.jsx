import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';

import Event from './messages/Event.jsx';
import Index from './Index.jsx';
import Groups from './group/Groups.jsx';
import Login from './login/Login.jsx';

const Center = () => (
    <Switch>
        <Route path="/event" component={Event} />
        <Route path="/group" component={Groups} />
        {/*Mieux comprendre le rôle de Route*/}
        <Route path="/login" component={Login} />
        <Route path="/" component={Index} />
    </Switch>
);

export default Center;