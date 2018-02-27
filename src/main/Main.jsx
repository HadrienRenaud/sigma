import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';

import Event from './event/Event.jsx';
import Group from './group/Group.jsx';
import LeftBar from './LeftBar.jsx';
import RightBar from './RightBar.jsx';
import Index from './Index.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx'

const Center = () => (
    <Switch>
        <Route path="/event" component={Event}/>
        <Route path="/group" component={Group}/>
        <Route exact path="/" component={Index}/>
    </Switch>
);

const Main = () => (
    /**La doc normale de Semantic UI n'est pas en accord
     * Normalement il y a sixteen wide column en pour une ligne
     * Mais ce code n'utiliser que twelve wide columns
    */
    <div>
        <Header/>

        <Body/>

        <Footer/>
    </div>
);

export default Main;