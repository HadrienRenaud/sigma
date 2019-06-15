import React, {Component} from 'react';
import {Route, Switch, Link, Redirect,} from 'react-router-dom';
import {Container, Grid, Image, Segment, Sidebar} from 'semantic-ui-react';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import Body from './layout/Body.jsx';
import Login from './login/Login.jsx';

import {UserContextProvider} from "./utils/contexts.jsx";

/**
 * @file Le composant React principal, généré quel que soit le path, et dans lequel
 * on "importe" les composants Header, Body et Footer.
 */

// pour quick-test le render d'un component, merci de le mettre a la schlag dans Center.jsx, plutot
// que de le mettre a la schlag dans Main.jsx ! sinon ca fout la merde pour le layout avec LeftBar
// (enfin si c'est pour quick-test un minimodule, merci de le mettre dans src/main/index/minimodules/)

function isLoggedIn() {
    return !!(
        localStorage.getItem('uid')
        && ((localStorage.getItem('loginValidity')
            && (new Date(localStorage.getItem('loginValidity'))).getTime() > Date.now()))
    );
}


class Main extends Component {

    state = {
        loggedIn: isLoggedIn(),
        toLogIn: false,
    };

    onLogin(user) {
        this.setState({
            loggedIn: true,
            user
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
            <div style={{
                minHeight: '100%',
                display: 'grid',
                gridTemplateRows: '1fr auto',
            }}>
                <div>
                    <UserContextProvider uid={this.state.user || localStorage.getItem('uid')}>
                        <Header
                            onLogOut={this.onLogOut.bind(this)}
                        />
                        <Container>
                            {this.state.loggedIn ?
                                <Switch>
                                    <Route path="/login" render={() => <Redirect to='/'/>}/>
                                    <Route path="/" render={props => <Body {...props} {...this.state}/>}/>
                                </Switch>
                                :
                                <Switch>
                                    <Route
                                        path="/login"
                                        render={props => <Login {...props} onLogIn={this.onLogin.bind(this)}/>}/>
                                    {this.state.toLogIn ?
                                        <Route path='/' render={() => <Redirect to='/login'/>}/>
                                        :
                                        <Route
                                            path="/"
                                            render={props => <Body {...props} {...this.state}/>}/>
                                    }
                                </Switch>
                            }
                        </Container>
                    </UserContextProvider>
                </div>
                <footer style={{
                    gridRowStart: 3,
                    gridRowEnd: 4,
                }}>
                    <Footer/>
                </footer>
            </div>
        );
    }
}

export default Main;
