import React from 'react';
import {Route, Link} from 'react-router-dom';

import faker from 'faker';

import {Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import EventCalendar from '../event/EventCalendar.jsx';

const GroupEvents = ({match}) => (
    <div>
        <EventCalendar/>
    </div>
);

export default GroupEvents;