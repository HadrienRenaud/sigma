/**
 * @file Barre d'information et d'acces rapide sur le cote de la page.
 * Pour le mettre a gauche ou a droite, c'est Body.jsx qu'il faut modifier.
 * 
 */

import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Grid, Menu, Accordion, Button, Segment, Icon, Component, Sticky, Container } from 'semantic-ui-react';
import GroupPanel from '../group/GroupPanel.jsx';
import PostPanel from '../messages/PostPanel.jsx';


const PinnedEvents = () => (
    <Segment.Group>
        <Segment color="teal" inverted>
            <p>Évenements</p>
        </Segment>
        <Button.Group basic fluid vertical>
            <PostPanel />
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
        <Segment color="teal" inverted>
            <p>Groupes</p>
        </Segment>
        <Button.Group basic fluid vertical>
            <GroupPanel/>
        </Button.Group>
    </Segment.Group>
);

const SideBar = () => (
    <Container>
        {/*}
        <Grid.Column>
            <Menu attached tabular widths={3}>
                <Menu.Item active as='a'>Active Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
            </Menu>
            <Segment attached>Segment</Segment>
            <Menu attached compact widths={3}>
                <Menu.Item active as='a'>Active Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
            </Menu>
            <Segment attached='bottom'>Segment</Segment>
        </Grid.Column>
        */}
        <PinnedGroups/>
        <PinnedEvents/>
    </Container>
);

export default SideBar;
