import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom';
import {Divider} from 'semantic-ui-react';
import AnnouncementCard from './AnnouncementCard.jsx';

import BigCalendar from 'react-big-calendar';

import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

const EventsList = [ //TODO
    {
        'title': 'Long 1',
        'allDay': true,
        'start': new Date(2017, 8, 1),
        'end': new Date(2017, 8, 3),
        'id': 1,
        'group': 1
    },
    {
        'title': 'Long 2',
        'allDay': true,
        'start': new Date(2017, 8, 2),
        'end': new Date(2017, 8, 27),
        'id': 2,
        'group': 0
    },
    {
        'title': 'Court 1',
        'start': new Date(2017, 8, 12, 10, 30, 0, 0),
        'end': new Date(2017, 8, 12, 12, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 3,
        'group': 0
    },
    {
        'title': 'Court 2',
        'start': new Date(2017, 8, 14, 10, 30, 0, 0),
        'end': new Date(2017, 8, 14, 12, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 4,
        'group': 0
    },
    {
        'title': 'Chevauchement 1',
        'start': new Date(2017, 8, 12, 12, 0, 0, 0),
        'end': new Date(2017, 8, 12, 15, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 5,
        'group': 1
    },
    {
        'title': 'Chevauchement 2',
        'start': new Date(2017, 8, 12, 13, 0, 0, 0),
        'end': new Date(2017, 8, 12, 16, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 6,
        'group': 0
    },
    {
        'title': 'Chevauchement 3',
        'start': new Date(2017, 8, 12, 13, 0, 0, 0),
        'end': new Date(2017, 8, 12, 18, 30, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 7,
        'group': 0
    },
    {
        'title': 'Chevauchement 4',
        'start': new Date(2017, 8, 12, 13, 0, 0, 0),
        'end': new Date(2017, 8, 12, 17, 0, 0, 0),
        desc: 'Ceci est un commentaire',
        'id': 8,
        'group': 0
    },

];

const CustomStyle = function(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    if(event.color){
        style.backgroundColor = event.color;
    }
    //TODO
    const GroupColor = {0:'blue',1:'red'};
    const IdleColor = {'blue':'blue','red':'red'};
    const SelectedColor = {'blue':'green','red':'green'};
    if(event.group in Object.keys(GroupColor)){
        if(isSelected){
            style.backgroundColor = SelectedColor[GroupColor[event.group]];
        } else {
            style.backgroundColor = IdleColor[GroupColor[event.group]];
        }
    }
    //EndOfTODO
    return {
        style
    };
};

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

    state={};

    resetComponent = () => this.setState({});

    getEvents() {
        const _events = EventsList;
        //TODO eventually
        return _events;
    }

    selectedEvent = -1;

    eventSelected(event) {
        console.log("why..."+event.id);
        this.selectedEvent = event.id;
        this.forceUpdate();
    }

    render() {
        const{ contextRef } = this.state;  
        const { match, location, history } = this.props;
        const test = "this is a test";
        const events = this.getEvents();

        return (
            <div>
                <div style={{'height':'600px'}}>
                    <BigCalendar
                        events={events}
                        culture={"fr"}
                        onSelectEvent={(event) => this.eventSelected(event)}
                        defaultView='week'
                        min={new Date(0,0,0,7,0,0)}
                        max={new Date(0,0,0,23,30,0)}
                        scrollToTime={new Date(0,0,0,4,0,0)}
                        eventPropGetter={CustomStyle}
                        localizer={localizer}
                    />
                </div>
                {this.selectedEvent>=0 ? <Divider/> : ""}
                {this.selectedEvent>=0 ? <Route component={AnnouncementCard}/> : ""}
            </div>
        );
    }
}

const EventCalendar = withRouter(EventCalendarUnrouted);

export default EventCalendar;