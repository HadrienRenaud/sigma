/**
 * @file Trombinoscope On Line
 */

import React from 'react';
import {Form, Grid, Header, Segment} from 'semantic-ui-react';
import TrombinoResults from './TrombinoResults.jsx';

class Trombino extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            givenName: "Louis",
            lastName: "Vaneau",
            nickname: "",
            formation: "",
            promo: "",
            sport: "",
            groups: ""
        };

        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        this.setState({[name]: value}); //ES6 computed property name syntax
    }


    render() {

        return (
            <div>
                <Header as='h1'>
                    Trombinoscope
                </Header>
                <Grid columns='equal'>
                    <Grid.Column width={3}>

                        <Form size='large'>

                            <Segment.Group piled>
                                <Segment>
                                    Prénom
                                    <Form.Input
                                        fluid
                                        placeholder='Louis'
                                        type='text'
                                        name='givenName'
                                        value={this.state.givenName}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Nom
                                    <Form.Input
                                        fluid
                                        placeholder='Vaneau'
                                        type='text'
                                        name='lastName'
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Surnom
                                    <Form.Input
                                        fluid
                                        placeholder='mythe'
                                        type='text'
                                        name='nickname'
                                        value={this.state.nickname}
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
                                        name='groups'
                                        value={this.state.groups}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                                <Segment>
                                    Groupe
                                    <Form.Input
                                        fluid
                                        placeholder='1829'
                                        type='text'
                                        name='promo'
                                        value={this.state.promo}
                                        onChange={this.handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>

                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        <h3>
                            Résultats
                            pour {this.state.givenName}{this.state.nickname ? ` « ${this.state.nickname} » ` : " "}{this.state.lastName}
                        </h3>
                        <TrombinoResults params={this.state}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Trombino;
