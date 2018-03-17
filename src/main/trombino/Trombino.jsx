/**
 * @file Trombinoscope On Line
 */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Button, Input, Container, Divider, 
    Grid, Header, Menu, Message, Segment, Table } from 'semantic-ui-react';
import TrombinoResults from './TrombinoResults.jsx';

/** 
 * @constant Requête GraphQL...
*/
// TODO
const GET_TROMBINO = gql`
    query trombinoQuery {
        blablablabla
    }
`;

class Trombino extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "",
            nom: "",
            surnom: "",
            formation: "",
            promo: "",
            sport: "",
            binet: "",
            groupe: "",

            // this.state.data sert a recuperer les infos de graphql pour les passer a TrombinoResults.
            // est-ce la bonne facon de faire?
            data:''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        // INSERER ENVOI DE QUERY GRAPHQL ETC ICI
        console.log("Submitting");
        console.log(JSON.stringify(this.state));

        //this.setState({ data: /*reponse de graphQL*/ );
        this.setState({ data: JSON.stringify(this.state) });
    }
    
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    render() {
        return (
            <div>
                <Grid columns='equal'>
                    <Grid.Column width={3}>

                        <Form size='large' onSubmit={this.handleSubmit}>

                            <Segment>
                                Critères de filtrage
                                <Button 
                                    fluid 
                                    color='blue'>
                                Envoyer la requête
                                </Button>
                            </Segment>{/*<Segment attached>*/}

                            <Segment.Group piled>
                                <Segment>
                                    Prénom
                                    <Form.Input
                                        fluid
                                        placeholder='Louis'
                                        type='text'
                                        name='prenom'
                                        value={this.state.prenom}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Nom
                                    <Form.Input
                                        fluid
                                        placeholder='Vaneau'
                                        type='text'
                                        name='nom'
                                        value={this.state.nom}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Surnom
                                    <Form.Input
                                        fluid
                                        placeholder='mythe'
                                        type='text'
                                        name='surnom'
                                        value={this.state.surnom}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>

                            <Segment.Group piled>
                                <Segment>
                                    Formation
                                    <Form.Input
                                        fluid
                                        placeholder='Cycle Ingénieur Polytechnicien'
                                        type='text'
                                        name='formation'
                                        value={this.state.formation}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Promo
                                    <Form.Input
                                        fluid
                                        placeholder='1829'
                                        type='text'
                                        name='promo'
                                        value={this.state.promo}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Sport
                                    <Form.Input
                                        fluid
                                        color='teal'
                                        placeholder='corde à sauter'
                                        type='text'
                                        name='sport'
                                        value={this.state.sport}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>

                            <Segment.Group piled>
                                <Segment>
                                    Binet
                                    <Form.Input
                                        fluid
                                        placeholder='Subaïsse'
                                        type='text'
                                        name='binet'
                                        value={this.state.binet}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Groupe
                                    <Form.Input
                                        fluid
                                        placeholder='1829'
                                        type='text'
                                        name='groupe'
                                        value={this.state.groupe}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>

                            <Segment.Group piled>
                                <Segment>
                                    <p>Autre</p>
                                </Segment>
                                <Segment.Group>
                                    <Segment>
                                        <p>Nested Top</p>
                                    </Segment>
                                    <Segment>
                                        <p>Nested Middle</p>
                                    </Segment>
                                    <Segment>
                                        <p>Nested Bottom</p>
                                    </Segment>
                                </Segment.Group>
                            </Segment.Group>

                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        <p>ici les resultats du trombino</p>
                        <TrombinoResults data={this.state.data}/>
                    </Grid.Column>

                </Grid>

            </div>
        );
    }
}

export default Trombino;
