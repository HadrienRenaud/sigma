/**
 * @file resultats du trombino. Component insere dans Trombino.jsx ; mis dans un fichier separe pour la lisibilite
 * 
 */

import React from 'react';
import {
    Form, Button, Input, Container, Divider,
    Grid, Header, Menu, Message, Segment, Table
} from 'semantic-ui-react';

class TrombinoResults extends React.Component {

    constructor(props) {
        super(props);

        /**
         * expected props :
         * [cf graphql query in Trombino.jsx]
         * data
         */

        // This binding is necessary to make `this` work in the callback
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    
    handlePageChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
    }

    handleSelectChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
    }

    render(){
        return (
            <div>
                <Segment>coucou</Segment>
                <p>{this.props.data}</p>
            </div>
        );
    }
}

export default TrombinoResults;
