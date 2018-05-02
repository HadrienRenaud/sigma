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
 * Pour le conditional rendering (mode loggedin/tologin, https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
 */
const LOGIN_URL_LOCAL = "http://localhost:3000/login";
const LOGIN_URL = "http://129.104.201.10:3000/login";

class Login extends React.Component {

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
    /*
    handleChangeMode(e) {
        const name = e.target.name; //l'attribut "name" du Component qui appelle ce handle
        this.setState({ mode: name }); //ES6 computed property name syntax
    }    
    */
    handleSubmit(event) {
        // TODO : VERIFICATION DES ENTREES
        // surtout verifier que les champs ne sont pas vides (ca peut poser des pbs au back apres)
        


        // GESTION DE L'AUTHENTIFICATION
        
        // fetch: a modern replacement for XMLHttpRequest.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
        fetch(LOGIN_URL_LOCAL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Passport takes the req.body.username and req.body.password and passes it to our verification function in the local strategy. 
                // (field names defined dans le back in passport.use(ldapstrategy, ...) )
                username: this.state.userInput,
                password: this.state.passwordInput
            })
        }).then((res) => {
            console.log("the Promise fetch succeeded (i.e. got a response from the server)");
            console.log(res);
            //fetch retursn just an HTTP response. we extract the JSON body content
            return res.json();
        }).catch((error) => {
            // The Promise returned from fetch() will only reject on network failure or if anything prevented the request from completing
            console.error('Error:', error);

            // afficher un message du type : "Erreur de connexion au réseau ou serveur inaccessible"
            //TODO
            alert("Erreur de connexion au réseau ou serveur inaccessible. \n" + error);
        }).then(result => {
            console.log(result);
            //console.log(result.token); //this is for JWT token, but not implemented (yet?)

            if (result.authSucceeded == true) {
                // rediriger vers le path /, eventuellement avec un signal de bienvenue
                //TODO
                alert("Authentification réussie. Vous êtes authentifié sur le backend.");
            } else {
                // afficher un message du type : "reessayer"
                //TODO
                alert("Authentification échouée, veuillez vérifier votre Caps Lock et que vous êtes bien en clavier français :)");
            }
        });
        
    }

    handleInputChange(event) {
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        const value = event.target.value;
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    renderLoggedIn() { // to render when user is already logged in
        //using the 'output' variable allows React to do lazy component mounting
        //https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
        let output;
        if (this.state.mode == 'loggedin') {
            output =
                <div>
                    blablablablabla
                </div>
            ;
        }
        return output; //returns null if variable was not modified
    }

    renderToLogin() { // to render when user is not yet logged in
        let output;

        if (this.state.mode == 'tologin') {
            output =
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

                                    <Form.Button fluid color='teal' size='large' content="Login"/>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>

                </div>
            ;
        }

        return output; //returns null if variable was not modified
    }

    render() {
        const { mode } = this.state;

        return (
            <div>
                {this.renderToLogin()}
                {this.renderLoggedIn()}
            </div>

        );
    }
}

export default Login;
