import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component } from 'semantic-ui-react';

const RightBar = () => (
    <div class="ui container">
        <Segment.Group>
        <Segment color="teal" inverted>
            <p>Prénom Nom</p>
        </Segment>
        <Button.Group basic fluid vertical>
            <Link to="/group/1"><Button>Paramètres</Button></Link>
            <Link to="/group/1"><Button>Déconnexion</Button></Link>
        </Button.Group>
    </Segment.Group>
    </div>
);

export default RightBar;