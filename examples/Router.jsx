/**
 * @file template a copier/modifier quand j'ai la flemme d'ecrire les import et la definition de la classe
 * 
 * @author kadabra
*/
import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

import NotFound from '';
import Index from '';
import GroupView from '';
import AllGroups from ''; 
import Event from '';


class RouterComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch> {/*forces exclusive path matching*/}
                <Route path="/event" component={Event} />
                <Route exact path="/groups" component={AllGroups} />
                <Route path="/groups/:uid" component={GroupView} />{/*pour les paths de la forme "/groups/:uid"*/}
                <Route exact path="/" component={Index} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default RouterComponent;
