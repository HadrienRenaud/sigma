import React from 'react';
import {Route, Link} from 'react-router-dom';

import faker from 'faker';

import {Accordion, Button, Segment, Checkbox, Icon, Divider, Card, Image } from 'semantic-ui-react';

import ListMembers from '../member/ListMembers.jsx';

const GroupMembers = ({match}) => (
    <div>
        <ListMembers/>
    </div>
);

export default GroupMembers;