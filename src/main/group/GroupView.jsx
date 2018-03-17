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
                <Popup
                    trigger={<Button color='yellow' icon='star' />}
                    content='Devenir administrateur'
                    inverted
                />
                <Popup
                    trigger={<Button color='blue' icon='user' />}
                    content='Devenir membre'
                    inverted
                />
                <Popup
                    trigger={<Button as='div' labelPosition='right'>
                        <Button color='pink'>
                            <Icon name='heart' />
                        </Button>
                        <Label as='a' basic color='pink' pointing='left'>2,048</Label>
                    </Button>}
                    content='Devenir sympathisant'
                    inverted
                />
                <Header as="h1" attached='top'>
                    {group.name}
                    <Header.Subheader>
                        <a href={`http://${group.website}`}>{group.website}</a>
                    </Header.Subheader>
                </Header>
                <Segment>
                    {group.description}
                </Segment>
                
                <Button.Group fluid attached="top">
                    <Button as={Link} to={match.url}>Annonces</Button>
                    <Button as={Link} to={match.url + "/events"}>Évènements</Button>
                    <Button as={Link} to={match.url + "/members"}>Membres</Button>
                    <Button as={Link} to={match.url + "/settings"}>Paramètres</Button>
                </Button.Group>

                <Segment attached>
                    <Switch>
                        <Route path={match.url + "/events"} component={GroupEvents} />
                        <Route path={match.url + "/members"} component={GroupMembers} />
                        <Route path={match.url + "/settings"} component={GroupSettings} />
                        <Route component={GroupAnnouncements} />
                    </Switch>
                </Segment>


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