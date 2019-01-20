/**
 * @file Barre d'information et d'acces rapide sur le cote de la page.
 * Pour le mettre a gauche ou a droite, c'est Layout.jsx qu'il faut modifier.
 * @author manifold
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Component, Container, Segment} from 'semantic-ui-react';
import GroupPanel from '../widgets/GroupPanel.jsx';
import EventsPanel from '../widgets/EventsPanel.jsx';


const PinnedEvents = () => (
    <Segment.Group>
        <Link to={"/events"}>
            <Segment color="teal" inverted>
                <p>Événements</p>
            </Segment>
        </Link>
        <Button.Group basic fluid vertical>
            <EventsPanel/>
        </Button.Group>
        <Segment textAlign="center">
            <Link to="/event/create"><Button>
                Créer
            </Button></Link>
        </Segment>
    </Segment.Group>

);

const PinnedGroups = () => (
    <Segment.Group>
        <Link to={"/groups"}>
            <Segment color="teal" inverted>
                <p>Groupes</p>
            </Segment>
        </Link>
        <Button.Group basic fluid vertical>
            <GroupPanel/>
        </Button.Group>
    </Segment.Group>
);

const SideBar = () => (
    <Container>
        <PinnedGroups/>
        <PinnedEvents/>
    </Container>
);

export default SideBar;
