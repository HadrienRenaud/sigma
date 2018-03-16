import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import Body from './layout/Body.jsx';

/**
 * @file Le composant React principal, généré quel que soit le path, et dans lequel
 * on "importe" les composants Header, GroupList, Body et Footer.
 */

// pour quick-test le render d'un component, merci de le mettre a la schlag dans Center.jsx, plutot
// que de le mettre a la schlag dans Main.jsx ! sinon ca fout la merde pour le layout avec LeftBar

const Main = () => (
    <div>
        <Header />
        <Body />
        <Footer />
    </div>
);

export default Main;