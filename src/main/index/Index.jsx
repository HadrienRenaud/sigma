import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import GroupAnnouncements from '../group/GroupAnnouncements.jsx';
import logo_sigma_large from '../../assets/logo_sigma_large.png';

/**
 * @file page d'accueil. ce Component wrap tous les minimodules presents sur la page d'accueil
 */

const Index = ({match}) => (
    <div>
        <p>Page d'accueil (Index)</p>
        {/* <GroupAnnouncements/> */}
    </div>
);

export default Index;