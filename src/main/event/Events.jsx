import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Divider} from 'semantic-ui-react';

import EventCalendar from './EventCalendar.jsx';

import AnnouncementCard from '../messages/AnnouncementCard.jsx';

class EventsFoundUnrouted extends React.Component {
    state = {}

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    setContextRef = contextRef => this.setState({contextRef})

    render() {
        const{ contextRef } = this.state;
        const { match, location, history } = this.props;

        return(
            <div ref={this.setContextRef}>
                <Divider hidden/>
                <EventCalendar path={match.url}/>
            </div>
        );
    }
}

const EventsFound = withRouter(EventsFoundUnrouted);

const Events = ({match}) => (
    <div>
        <Switch>
            <Route path={match.url+"/create"} component={EventsFound}/>
            <Route component={EventsFound}/>
        </Switch>
    </div>
);

export default Events;