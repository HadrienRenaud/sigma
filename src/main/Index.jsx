import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import GroupAnnouncements from './group/GroupAnnouncements.jsx';

const Index = ({match}) => (
    <div>
        <Divider fitted hidden/>
        <Header as={'h1'} textAlign={"center"}>
            SIGMA
        </Header>
        <GroupAnnouncements/>
    </div>
)

export default Index;