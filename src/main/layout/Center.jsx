import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';

import Event from '../messages/Event.jsx';
import Index from '../index/Index.jsx';
import Groups from '../group/Groups.jsx';
import Login from '../login/Login.jsx';
import NotFound from '../Errors.jsx';
import Trombino from '../trombino/Trombino.jsx';
import Services from '../services/Services.jsx';

const Center = () => (
    <Switch> {/*forces exclusive path matching: routes to the first Route tag that matches*/}
        <Route path="/event" component={Event} />
        <Route path="/group" component={Groups} />
        <Route path="/login" component={Login} />
        <Route path="/trombino" component={Trombino} />
        <Route path="/services" component={Services} />
        <Route exact path="/" component={Index} />
        <Route component={NotFound}/>
    </Switch>
);

export default Center;