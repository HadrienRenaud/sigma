/**
 * @file Barre d'information et d'acces rapide sur le cote de la page.
 * Pour le mettre a gauche ou a droite, c'est Body.jsx qu'il faut modifier.
 * @author manifold
 */

import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Grid, Menu, Accordion, Button, Segment, Icon, Component, Sticky, Container } from 'semantic-ui-react';
import GroupPanel from '../groups/GroupPanel.jsx';
import EventsPanel from '../messages/EventsPanel.jsx';


const SideBar = () => (
    <Container>
        <GroupPanel/>
        <EventsPanel/>
    </Container>
);

export default SideBar;
