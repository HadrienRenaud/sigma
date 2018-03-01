import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';

import Event from './event/Event.jsx';
import Index from './Index.jsx';
import Group from './group/Group.jsx';
import LoginForm from './LoginForm.jsx'

const Center = () => (
    <Switch>
        <Route path="/event" component={Event} />
        <Route path="/group" component={Group} />
        {/*Mieux comprendre le rôle de Route*/}
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={Index} />
    </Switch>
);

export default Center;