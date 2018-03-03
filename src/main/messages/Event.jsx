import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Route, Switch, Link } from 'react-router-dom';
import Error404 from '../../Errors.jsx';
import {Divider} from 'semantic-ui-react';

import EventCalendar from './EventCalendar.jsx';

import {AnnouncementCard} from './Announcement.jsx';

class EventFoundUnrouted extends React.Component {
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

const EventFound = withRouter(EventFoundUnrouted);

const Event = ({match}) => (
    <div>
        <Switch>
            <Route path={match.url+"/create"} component={EventFound}/>
            <Route component={EventFound}/>
        </Switch>
    </div>
);

export default Event;