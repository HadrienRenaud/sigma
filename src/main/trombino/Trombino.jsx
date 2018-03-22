/**
 * @file Trombinoscope On Line
 */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Button, Input, Container, Divider, 
    Grid, Header, Menu, Message, Segment, Table } from 'semantic-ui-react';
import TrombinoResults from './TrombinoResults.jsx';

class Trombino extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: "",
            prenom: "",
            nom: "",
            surnom: "",
            formation: "",
            promo: "",
            sport: "",
            binet: "",
            groupe: ""
        };

        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
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

                        <Form size='large'>

                            <Segment.Group piled>
                                <Segment>
                                    Identifiant
                                    <Form.Input
                                        fluid
                                        placeholder='louis.vaneau'
                                        type='text'
                                        name='uid'
                                        value={this.state.uid}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
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

                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h1'>
                            Trombinoscope
                        </Header>
                        <h3>
                            Résultats pour {this.state.prenom}{this.state.surnom ? ` « ${this.state.surnom} » ` : " "}{this.state.nom}
                        </h3>
                        {this.state.uid ? <h4>{this.state.uid}</h4> : ""}
                        <TrombinoResults query={this.state}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Trombino;
