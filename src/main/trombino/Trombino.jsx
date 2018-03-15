/**
 * @file Trombinoscope On Line
 */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Button, Input, Container, Divider, 
    Grid, Header, Menu, Message, Segment, Table } from 'semantic-ui-react';

/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
// TODO
const GET_ALLGROUPS = gql`
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
            formation: "",
            promo: "",
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        console.log("Submitting");
        console.log(this.state.userInput);
        console.log(this.state.passwordInput);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    render() {
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Column >

                        <Form size='large' onSubmit={this.handleSubmit}>

                            <Segment>
                                Critères de filtrage
                                <Button fluid content='Envoyer la requête' primary/>
                            </Segment>{/*<Segment attached>*/}

                            <Segment piled>
                                <Form.Input
                                    fluid
                                    placeholder='Prénom'
                                    type='text'
                                    name='prenomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Nom'
                                    type='text'
                                    name='nomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Surnom'
                                    type='text'
                                    name='surnomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />
                            </Segment>
                        </Form>


                        <Segment.Group>
                            <Segment>
                                <p>Identité</p>
                            </Segment>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    placeholder='Prénom'
                                    type='text'
                                    name='prenomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Nom'
                                    type='text'
                                    name='nomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Surnom'
                                    type='text'
                                    name='surnomInput'
                                    value={this.state.prenomInput}
                                    onChange={this.handleInputChange}
                                />

                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                            
                            <Segment>
                                <p>Collectif</p>
                            </Segment>
                            <Segment.Group>
                                <Segment>
                                    <p>Promo</p>
                                </Segment>
                                <Segment>
                                    <p>Formation</p>
                                </Segment>
                                <Segment>
                                    <p>Nested Bottom</p>
                                </Segment>
                            </Segment.Group>
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
                    </Grid.Column>

                    <Grid.Column>
                        <p>ici les resultats du trombino</p>
                        <Segment>coucou</Segment>
                    </Grid.Column>

                </Grid>

            </div>
        );
    }
}

export default Trombino;
