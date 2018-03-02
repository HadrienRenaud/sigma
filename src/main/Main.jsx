import React from 'react';
import { Route, Switch, Link, } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';
import GroupList from './group/GroupList.jsx';

/**
 * @file Le React.Component principal, celui qui est généré quel que soit le path, et dans lequel
 * on "importe" les Component Header, ListGroups, Body et Footer.
 */

const Main = () => (
    /**La doc normale de Semantic UI n'est pas en accord
     * Normalement il y a sixteen wide column en pour une ligne
     * Mais ce code n'utiliser que twelve wide columns
     */
    <Route path="/">
        <div>
            <Header />
            <GroupList/>
        </div>
        
        {/*<Body />*/}
        {/*<Footer/> does not work yet :/ */}
    </Route>
);

export default Main;