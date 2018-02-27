import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import Event from './event/Event.jsx';
import Group from './group/Group.jsx';
import LeftBar from './LeftBar.jsx';
import RightBar from './RightBar.jsx';
import Index from './Index.jsx';

const Center = () => (
    <Switch>
        <Route path="/event" component={Event}/>
        <Route path="/group" component={Group}/>
        <Route exact path="/" component={Index}/>
    </Switch>
);

const Body = () => (
    <Grid container>
        <Grid.Column width={2}> 
            <LeftBar/>
        </Grid.Column>

        <Grid.Column width={8}>
            <Center/>
        </Grid.Column>
        
        <Grid.Column width={2}>
            <RightBar/>
        </Grid.Column>
    </Grid>
);

export default Body;