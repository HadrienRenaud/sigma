import React from 'react';
import {Mutation} from 'react-apollo';
import { Form } from 'semantic-ui-react';

import gql from 'graphql-tag';

const LOGIN_REQUEST = gql`
    mutation loginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;

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
            mode: "tologin"
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleChangeMode = this.handleChangeMode.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        const value = event.target.value;
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    handleSubmit(event, login) {
        event.preventDefault();
        const loginResult = login({ variables: { username: this.state.userInput, password: this.state.passwordInput } });

        loginResult.then(({data}) => {
            console.log(data);
            console.log(typeof(data.login));
            console.log(data.login);
            localStorage.setItem('token', data.login);
        });
    }

    renderLoggedIn() { // to render when user is already logged in
        //using the 'output' variable allows React to do lazy component mounting
        //https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
        let output;
        if (this.state.mode == 'loggedin') {
            output =
                <div>
                    blablablablabla
                </div>;
        }
        return output; //returns null if variable was not modified
    }

    render() {
        return (
            <Mutation
                mutation={LOGIN_REQUEST}
                variables={{
                    username: this.state.userInput,
                    password: this.state.passwordInput
                }}
            >
                {(loginMutation, { data }) => (
                    <Form size='large' onSubmit={e => this.handleSubmit(e, loginMutation)}>
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

                        <Form.Button fluid color='teal' size='large' content="Login" />
                    </Form>
                )}
            </Mutation>

        );
    }
}

export default LoginForm;