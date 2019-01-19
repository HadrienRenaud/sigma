import React from 'react';
import {Route, Link} from 'react-router-dom';

import {Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import EventCalendar from '../../../widgets/EventCalendar.jsx';

const GroupEvents = ({match}) => (
    <div>
        <EventCalendar/>
    </div>
);

export default GroupEvents;