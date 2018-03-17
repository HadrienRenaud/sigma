import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import { Header, Button, Container, Icon, Popup, Label, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import GroupAnnouncements from './GroupAnnouncements.jsx';
import GroupEvents from './GroupEvents.jsx';
import GroupMembers from './GroupMembers.jsx';
import GroupSettings from './GroupSettings.jsx';

const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        accessGroups {
            group(uid: $uid) {
                uid
                name
                website
                description
                createdAt
                updatedAt
            }
        }
    }
`;


class GroupFoundUnrouted extends React.Component { //TODO change into semantic-ui-react
    state = {}

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    setContextRef = contextRef => this.setState({contextRef})

    render() {
        const{ contextRef } = this.state;
        const { match, location, history } = this.props;
        const { data: { loading, error, accessGroups } } = this.props;

        
        console.log("Match:",match);
        console.log("Where:",location);
        console.log("History:",history);
        
        if (loading) {
            return <div>Please wait...</div>;
        } else if (error) {
            return <div>Error {error}</div>;
        }
        
        const group = accessGroups.group;

        return(
            <Container ref={this.setContextRef}>
                <Header as="h1">
                    {group.name}
                </Header>
                <a href={group.website}>{group.website}</a>
                <p>
                    {group.description}
                </p>
            </Container>
        );
    }
}

const GroupFound = graphql(GET_GROUP,{
    options: ({ match }) => ({ variables: { uid: match.params.uid } })
})(withRouter(GroupFoundUnrouted));

const GroupView = ({match}) => (
    <Switch>
        <Route path={match.url+"/:uid"} component={GroupFound}/>
        <Route component={Error404}/>
    </Switch>
);

export default GroupView;