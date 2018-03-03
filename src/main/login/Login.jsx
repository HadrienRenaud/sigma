/**
 * @file Page de connexion
 * @author guillaume.wang
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Error404 from '../../Errors.jsx';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';


import LoginForm from './LoginForm.jsx';

/** 
 * Copié puis modifié depuis https://semantic-ui.com/usage/layout.html
 */

class LoginUnrouted extends React.Component {

    // https://reactjs.org/docs/forms.html
    // this "controlled components" method is the recommended way to manage forms:
    // the idea is making the React state be the “single source of truth”.

    constructor(props) {
        super(props);
        this.state = {
            userValue: '',
            passwordValue: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    handleSubmit(event) {
        console.log(this.state.userValue);
        console.log(this.state.passwordValue);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }
    
    render() {
        const { contextRef } = this.state;
        const { match, location, history } = this.props;

        return (
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/logo.png' />
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Identifiant Frankiz'
                                    name='user'
                                    value={this.state.userValue}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Mot de passe'
                                    type='password'
                                    nane='password'
                                    value={this.state.passwordValue}
                                    onChange={this.handleInputChange}
                                />

                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const Login = withRouter(LoginUnrouted);

export default Login;
