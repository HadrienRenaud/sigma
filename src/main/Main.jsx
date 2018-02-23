import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';

import Event from './event/Event.jsx';
import Group from './group/Group.jsx';
import LeftBar from './LeftBar.jsx';
import RightBar from './RightBar.jsx';
import Index from './Index.jsx';

const Container = () => (
    <Switch>
        <Route path="/event" component={Event}/>
        <Route path="/group" component={Group}/>
        <Route exact path="/" component={Index}/>
    </Switch>
)

const Main = () => (
    <div className="ui grid">
        <div className="ui sticky left floated two wide column">
            <div className="ui segment"/*TODO: Sticky*/>
                <LeftBar/>
            </div>
        </div>

        <div className="text container eight wide column">
            <Container/>
        </div>
        
        <div className="ui sticky right floated two wide column">
            <div className="ui segment" /*TODO: Sticky*/>
                <RightBar/>
            </div>
        </div>
    </div>
)

export default Main;