import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

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

const Main = () => (
    <div>
        <Header />
        <Switch>
            <Route path="/login" render={props => <Login {...props}/>}/>
            <Route path="/" render={props => <Body {...props}/>}/>
        </Switch>
        <Footer />
    </div>
);

export default Main;