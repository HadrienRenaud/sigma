import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import GroupAnnouncements from './group/GroupAnnouncements.jsx';
import logo_sigma_large from '../assets/logo_sigma_large.png';

const Index = ({match}) => (
    <div>
        <Image alt='Logo' src={logo_sigma_large} size='large' centered={true} />
        <GroupAnnouncements/>
    </div>
);

export default Index;