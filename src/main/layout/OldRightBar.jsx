import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component } from 'semantic-ui-react';

/** 
 * @summary Classe codant pour le bandeau de sigma
 * @deprecated
*/
const RightBar = () => (
    <div className="ui container">
        <Segment.Group>
            <Segment color="teal" inverted>
                <p>Prénom Nom</p>
            </Segment>
            <Button.Group basic fluid vertical>
                <Link to="/settings"><Button>Paramètres</Button></Link>
                <Link to="/logout"><Button>Déconnexion</Button></Link>
            </Button.Group>
        </Segment.Group>
    </div>
);

export default RightBar;