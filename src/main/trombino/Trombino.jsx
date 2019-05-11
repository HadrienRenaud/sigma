/**
 * @file Trombinoscope On Line
 */

import React, {Component, createRef} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
    Form, Button, Input, Container, Divider,
    Grid, Header, Menu, Message, Segment, Table, Sticky, Rail, Ref, Image
} from 'semantic-ui-react';
import TrombinoResults from './TrombinoResults.jsx';

class Trombino extends Component {

    contextRef = createRef();

    state = {
        givenName: "Louis",
        lastName: "Vaneau",
        nickname: "",
        formation: "",
        promo: "",
        sport: "",
        groups: "",
        compact: false,
    };

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        this.setState({[name]: value}); //ES6 computed property name syntax
    }

    calcHeight(node) {
        if (node && !this.state.height) {
            this.setState({
                height: node.offsetHeight
            });
        }
    }

    render() {
        return (
            <div>
                <Grid centered columns={15}>
                    <Grid.Column width={3}>
                        <Form size='large'>
                            <Segment.Group>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        placeholder='Louis'
                                        type='text'
                                        name='givenName'
                                        value={this.state.givenName}
                                        onChange={this.handleInputChange}
                                        label="Prénom"
                                    />
                                    <Form.Input
                                        fluid
                                        placeholder='Vaneau'
                                        type='text'
                                        name='lastName'
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange}
                                        label="Nom"
                                    />
                                    <Form.Input
                                        fluid
                                        placeholder='mythe'
                                        type='text'
                                        name='nickname'
                                        value={this.state.nickname}
                                        onChange={this.handleInputChange}
                                        label="Surnom"
                                    />
                                </Segment>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        placeholder='Cycle Ingénieur Polytechnicien'
                                        type='text'
                                        name='formation'
                                        value={this.state.formation}
                                        onChange={this.handleInputChange}
                                        label="Formation"
                                    />
                                    <Form.Input
                                        fluid
                                        placeholder='1829'
                                        type='text'
                                        name='promo'
                                        value={this.state.promo}
                                        onChange={this.handleInputChange}
                                        label="Promo"
                                    />
                                    <Form.Input
                                        fluid
                                        color='teal'
                                        placeholder='corde à sauter'
                                        type='text'
                                        name='sport'
                                        value={this.state.sport}
                                        onChange={this.handleInputChange}
                                        label="Sport"
                                    />
                                </Segment>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        placeholder='Subaïsse'
                                        type='text'
                                        name='groups'
                                        value={this.state.groups}
                                        onChange={this.handleInputChange}
                                        label="Binet"
                                    />
                                </Segment>
                                <Segment>
                                    <Form.Checkbox
                                        label='Compacter les résultats'
                                        onChange={(event) => {
                                            this.setState({compact: !this.state.compact});
                                        }}
                                    />
                                </Segment>
                            </Segment.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={12}>

                        <Header as='h1'>
                            Trombinoscope
                        </Header>
                        <h3>
                            Résultats
                            pour {this.state.givenName}{this.state.nickname ? ` « ${this.state.nickname} » ` : " "}{this.state.lastName}
                        </h3>
                        <TrombinoResults params={this.state}/>
                    </Grid.Column>
                </Grid>

            </div>);
    }
}

export default Trombino;
