import React from 'react';
import {Mutation} from 'react-apollo';
import {Form, Message} from 'semantic-ui-react';

import gql from 'graphql-tag';
import {Redirect} from "react-router-dom";
import {apiUrl} from "../../config.jsx";

const STATES = {
    loggedIn: 0,
    notLoggedIn: 1,
    error: 2,
};

/**
 * Copié puis modifié depuis https://react.semantic-ui.com/layouts/login
 * On s'est aussi beaucoup inspire de https://react.semantic-ui.com/collections/form#form-example-capture-values
 * Pour le conditional rendering (mode loggedin/tologin, https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
 */

class LoginForm extends React.Component {

    // https://reactjs.org/docs/forms.html
    // this "controlled components" method is the recommended way to manage forms:
    // the idea is making the React state be the “single source of truth”.
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            passwordInput: "",
            mode: STATES.notLoggedIn,
            error: "",
            loading: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        const value = event.target.value;
        this.setState({[name]: value}); //ES6 computed property name syntax
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Sending login request to ", apiUrl + '/login');
        this.setState({loading: true});
        const loginRequest = fetch(apiUrl + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.userInput,
                password: this.state.passwordInput
            })
        });
        loginRequest
            .then(data => data.json())
            .then((data) => {
                this.setState({loading: false})
                console.log("Answer :", data);
                if (data.authSucceeded) {
                    this.setState({mode: STATES.loggedIn});
                    if (data.token)
                        localStorage.setItem("token", data.token);
                } else {
                    console.log("Changing state");
                    this.setState({
                        mode: STATES.error,
                        error: data.message,
                    });
                }
            });
    }

    render() {
        if (this.state.mode === STATES.loggedIn)
            return <Redirect to='/'/>;

        return (
            <Form size='large' onSubmit={e => this.handleSubmit(e)} error={this.state.mode === STATES.error}>
                <Message
                    error
                    header="Error"
                    content={this.state.error}
                />
                <Form.Input
                    fluid
                    icon='user' iconPosition='left'
                    placeholder='Identifiant Frankiz'
                    type='text' name='userInput'
                    value={this.state.userInput}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    fluid
                    icon='lock' iconPosition='left'
                    placeholder='Mot de passe'
                    type='password' name='passwordInput'
                    value={this.state.passwordInput}
                    onChange={this.handleInputChange}
                />
                <Form.Button fluid color='blue' size='large' content="Login" loading={this.state.loading}/>
            </Form>
        );
    }
}

export default LoginForm;