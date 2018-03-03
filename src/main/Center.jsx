import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';

import Event from './event/Event.jsx';
import Index from './Index.jsx';
import Group from './group/Group.jsx';
import Login from './login/Login.jsx';

const Center = () => (
    <Switch> {/*forces exclusive path matching: routes to the first Route tag that matches*/}
        <Route path="/event" component={Event} />
        <Route path="/group" component={Group} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Index} />
    </Switch>
);

export default Center;