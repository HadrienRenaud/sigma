import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';
import ListGroups from './group/ListGroups.jsx';

const Main = () => (
    /**La doc normale de Semantic UI n'est pas en accord
     * Normalement il y a sixteen wide column en pour une ligne
     * Mais ce code n'utiliser que twelve wide columns
    */
    <div>
        <Header/>

        <ListGroups/>
        <Body/>

        {/*<Footer/>*/}
    </div>
);

export default Main;