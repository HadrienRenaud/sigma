/**
 * @file Le Child principal de Body; partage horizontalement la page avec SideBar
 */

import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';

import Event from '../messages/Event.jsx';
import Index from '../index/Index.jsx';
import GroupView from '../group/GroupView.jsx';
import AllGroups from '../group/AllGroups.jsx';
import Login from '../login/Login.jsx';
import NotFound from '../Errors.jsx';
import Trombino from '../trombino/Trombino.jsx';
import Services from '../services/Services.jsx';

const Center = () => (
    <Switch> {/*forces exclusive path matching: routes to the first Route tag that matches*/}
        <Route path="/event" component={Event} />
        <Route exact path="/groups" component={AllGroups} />
        <Route path="/groups/:uid" component={GroupView} />{/*pour les paths de la forme "/groups/:uid"*/}
        <Route path="/login" component={Login} />
        <Route path="/tol" component={Trombino} /> {/*l'appelation TOL est tradi.*/}
        <Route path="/services" component={Services} />
        <Route exact path="/" component={Index} />
        <Route component={NotFound}/>
    </Switch>
);

export default Center;