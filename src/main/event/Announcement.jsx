import React from 'react';
import {Route, Link} from 'react-router-dom';

import faker from 'faker';

import {Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';

const AnnouncementCard = () => (
    <Card fluid>
        <Card.Content>
            <Card.Header>
                Annonce
            </Card.Header>
            <Card.Meta>
                sous-titre
            </Card.Meta>
            <Card.Description>
                {faker.lorem.paragraphs()}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            buttons, maybe
        </Card.Content>
    </Card>
);

const Announcements = () => (
    <Card.Group>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
    </Card.Group>
);

export {Announcements, AnnouncementCard};