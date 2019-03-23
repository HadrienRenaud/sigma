import React, {Component} from 'react';
import {Route, Switch, Link, Redirect,} from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import Body from './layout/Body.jsx';
import Login from './login/Login.jsx';

import decode from 'jwt-decode';

/**
 * @file Le composant React principal, généré quel que soit le path, et dans lequel
 * on "importe" les composants Header, Body et Footer.
 */

// pour quick-test le render d'un component, merci de le mettre a la schlag dans Center.jsx, plutot
// que de le mettre a la schlag dans Main.jsx ! sinon ca fout la merde pour le layout avec LeftBar
// (enfin si c'est pour quick-test un minimodule, merci de le mettre dans src/main/index/minimodules/)

function isLoggedIn() {
    return !!(
        localStorage.getItem('token')
        && localStorage.getItem('tokenValidity')
        && (new Date(localStorage.getItem('tokenValidity'))).getTime() > Date.now());
}


class Main extends Component {

    state = {
        loggedIn: isLoggedIn(),
        toLogIn: false,
    };

    onLogin() {
        this.setState({
            loggedIn: true
        });
    }

    onLogOut() {
        this.setState({
            loggedIn: false,
            toLogIn: true
        });
    }

    render() {
        return (
            <div>
                <Header
                    onLogOut={this.onLogOut.bind(this)}
                />
                <Switch>
                    {this.state.loggedIn ?
                        <Route path="/login" render={() => <Redirect to='/'/>}/>
                        :
                        <Route path="/login" render={props => <Login {...props} onLogIn={this.onLogin.bind(this)}/>}/>
                    }
                    {!this.state.loggedIn && this.state.toLogIn ?
                        <Route path='/' redner={() => <Redirect to='/login'/>}/>
                        :
                        <Route path="/" render={props => <Body {...props} loggedIn={this.state.loggedIn} />}/>
                    }
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;