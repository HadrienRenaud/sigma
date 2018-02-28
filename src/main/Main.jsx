import React from 'react';
import { render } from 'react-dom';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';

import Event from './event/Event.jsx';
import Group from './group/Group.jsx';
import LeftBar from './LeftBar.jsx';
import RightBar from './RightBar.jsx';
import Index from './Index.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';

import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_GROUPS = gql`
    query GroupQuery {
        groups {
            name
            id
        }
    }
`;

class Main extends React.Component {

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Main;