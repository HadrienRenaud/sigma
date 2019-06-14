import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Route, Switch, Link} from 'react-router-dom';
import {Button, Segment, Icon, Divider, Card, Modal} from 'semantic-ui-react';
import AnnouncementCard from './AnnouncementCard.jsx';

import BigCalendar from 'react-big-calendar';

import moment from 'moment';
import EventResume from "./EventResume.jsx";

const localizer = BigCalendar.momentLocalizer(moment);

const EventsList = [ //TODO
    {
        'title': 'Long 1',
        'allDay': true,
        'start': new Date(2019, 5, 1),
        'end': new Date(2019, 5, 3),
        'mid': 1,
        'group': 1
    },
    {
        'title': 'Long 2',
        'allDay': true,
        'start': new Date(2019, 5, 2),
        'end': new Date(2019, 5, 27),
        'mid': 2,
        'group': 0
    },
    {
        'title': 'Court 1',
        'start': new Date(2019, 5, 12, 10, 30, 0, 0),
        'end': new Date(2019, 5, 12, 12, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 3,
        'group': 0
    },
    {
        'title': 'Court 2',
        'start': new Date(2019, 5, 14, 10, 30, 0, 0),
        'end': new Date(2019, 5, 14, 12, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 4,
        'group': 0
    },
    {
        'title': 'Chevauchement 1',
        'start': new Date(2019, 5, 12, 12, 0, 0, 0),
        'end': new Date(2019, 5, 12, 15, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 5,
        'group': 1
    },
    {
        'title': 'Chevauchement 2',
        'start': new Date(2019, 5, 12, 13, 0, 0, 0),
        'end': new Date(2019, 5, 12, 16, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 6,
        'group': 0
    },
    {
        'title': 'Chevauchement 3',
        'start': new Date(2019, 5, 12, 13, 0, 0, 0),
        'end': new Date(2019, 5, 12, 18, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 7,
        'group': 0
    },
    {
        'title': 'Chevauchement 4',
        'start': new Date(2019, 5, 12, 13, 0, 0, 0),
        'end': new Date(2019, 5, 12, 17, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'mid': 8,
        'group': 0
    },

];

class EventCalendarUnrouted extends React.Component {
    componentWillMount() {
        this.resetComponent();
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    setContextRef = contextRef => this.setState({contextRef});

    state = {
        selectedEvent: false
    };

    resetComponent = () => this.setState({});

    getEvents() {
        const _events = EventsList;
        //TODO eventually
        return _events;
    }

    eventSelected(event) {
        console.log("why..." + event.mid);
        if (event.mid !== this.state.selectedEvent)
            this.setState({selectedEvent: event});
        else
            this.setState({selectedEvent: false});
    }

    render() {
        const {contextRef} = this.state;
        const {match, location, history} = this.props;
        const test = "this is a test";
        const events = this.getEvents();

        return (
            <div>
                <div style={{'height': '600px'}}>
                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        culture={"fr"}
                        onSelectEvent={(event) => this.eventSelected(event)}
                        onSelectSlot={() => this.setState({selectedEvent: false})}
                        selectable
                        selected={this.state.selectedEvent || {}}
                        defaultView='week'
                        min={new Date(0, 0, 0, 7, 0, 0)}
                        max={new Date(0, 0, 0, 23, 30, 0)}
                        scrollToTime={new Date(0, 0, 0, 4, 0, 0)}
                    />
                </div>
                {
                    this.state.selectedEvent &&
                    <EventResume
                        centered={false}
                        mid={this.state.selectedEvent.mid}
                        open={!!this.state.selectedEvent}
                        onClose={() => this.setState({selectedEvent: false})}
                        closeIcon
                    />
                }
            </div>
        );
    }
}

const EventCalendar = withRouter(EventCalendarUnrouted);

export default EventCalendar;
