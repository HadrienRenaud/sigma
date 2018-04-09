/**
 * @file Page de connexion
 * @author guillaume.wang
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo_sigma from '../../assets/logo_sigma.png';

/** 
 * Copié puis modifié depuis https://react.semantic-ui.com/layouts/login
 * On s'est aussi beaucoup inspire de https://react.semantic-ui.com/collections/form#form-example-capture-values
 */

class Login extends React.Component {

    // https://reactjs.org/docs/forms.html
    // this "controlled components" method is the recommended way to manage forms:
    // the idea is making the React state be the “single source of truth”.

    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            passwordInput: ""
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        // INSERER GESTION DE L'AUTHENTIFICATION ICI
        console.log("submitted userInput: ", this.state.userInput);
        console.log("submitted passwordInput: ", this.state.passwordInput);
        console.log("Submitting");
    }

    handleInputChange(event) {
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        const value = event.target.value;
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    render() {
        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo_sigma} />
                            Log-in to your account
                        </Header>
                        <Segment raised>
                            <Form size='large' onSubmit={this.handleSubmit}>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Identifiant Frankiz'
                                    type='text'
                                    name='userInput'
                                    value={this.state.userInput}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Mot de passe'
                                    type='password'
                                    name='passwordInput'
                                    value={this.state.passwordInput}
                                    onChange={this.handleInputChange}
                                />

                                <Form.Button
                                    fluid
                                    color='teal' 
                                    size='large'
                                    content="Login"
                                />
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>

                <strong>onChange:</strong>
                <pre>{JSON.stringify(this.state.userInput)}</pre>
                <pre>{JSON.stringify(this.state.passwordInput)}</pre>
                
            </div>
        );
    }
}

export default Login;
