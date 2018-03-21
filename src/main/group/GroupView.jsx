/**
 * @file La page principale d'un groupe ! Regroupera presentation, annonces, administrations...
 * @author manifold
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, NavLink, Link, withRouter } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import { Menu, Header, Button, Container, Icon, Popup, Label, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import GroupAnnouncements from './group_view/GroupAnnouncements.jsx';
import GroupPosts from './group_view/GroupPosts.jsx';
import GroupPageInterne from './group_view/GroupPageInterne.jsx';
import GroupAdministrer from './group_view/GroupAdministrer.jsx';
import GroupDescription from './group_view/GroupDescription.jsx';
import GroupEvents from './group_view/GroupEvents.jsx';

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


class GroupUnrouted extends React.Component { //TODO change into semantic-ui-react
    state = {}

    // react-router-dom's withRouter automatically passes the props match, location and history to the withRouter'd Component
    // these props are useful to interact with the current URL and the browsing history
    // cf https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    setContextRef = contextRef => this.setState({ contextRef })

    render() {
        
        const { contextRef } = this.state;
        const { match, location, history } = this.props;
        
        // 
        const { data: { loading, error, accessGroups } } = this.props;

        console.log("Match:", match);
        console.log("Where:", location);
        console.log("History:", history);

        //
        if (loading) {
            return <div>Please wait...</div>;
        } else if (error) {
            return <div>Error {error}</div>;
        }

        const group = accessGroups.group;

        return (
            <Container ref={this.setContextRef}>

                <Popup
                    trigger={<Button color='yellow' icon='star' />}
                    content='Devenir administrateur'
                    position='top left'
                    inverted
                />
                <Popup
                    trigger={<Button color='blue' icon='user' />}
                    content='Devenir membre'
                    position='top left'
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
                    position='top left'
                    inverted
                />

                <Header as="h1" attached='top'>
                    {group.name}
                    <Header.Subheader>
                        <a href={`http://${group.website}`}>{group.website}</a>
                    </Header.Subheader>

                </Header>

                <Segment attached='top'>
                    {group.description}
                </Segment>
                
                {/*voir le react-router.Switch plus bas pour voir quels components sont générés*/}
                <Menu attached='top' pointing>
                    <Menu.Item as={NavLink} to={match.url + "/annonces"} 
                        content="Annonces" />
                    <Menu.Item as={NavLink} to={match.url + "/posts"}
                        content="Posts" />
                    <Menu.Item as={NavLink} to={match.url + "/events"}
                        content="Evénements" />
                    <Menu.Item as={NavLink} to={match.url + "/interne"}
                        content="Page interne" /> {/*réservé aux membres du groupe*/}
                    <Menu.Item as={NavLink} to={match.url + "/admin"}
                        content="Administrer" /> {/*réservé aux administrateurs du groupe*/}
                    <Menu.Item as={NavLink} to={match.url + "/description"}
                        position='right'
                        content = "Description"/>
                </Menu>

                <Segment attached>
                    <Switch>
                        <Route exact path={match.url + "/"} component={GroupAnnouncements} />
                        {/*la premiere fois qu'on arrive sur la page, on ne change pas le path mais on affiche quand meme GroupAnnouncements*/}
                        <Route path={match.url + "/annonces"} component={GroupAnnouncements} />
                        <Route path={match.url + "/posts"} component={GroupPosts} />
                        <Route path={match.url + "/events"} component={GroupEvents} />
                        <Route path={match.url + "/interne"} component={GroupPageInterne} />
                        <Route path={match.url + "/admin"} component={GroupAdministrer} />
                        <Route path={match.url + "/description"} component={GroupDescription} />
                        <Route component={Error404} />
                    </Switch>
                </Segment>


            </Container>
        );
    }
}

const GroupRouted = withRouter(GroupUnrouted);

const GroupWithGraphQL = graphql(GET_GROUP, {
    options: ({ match }) => ({ variables: { uid: match.params.uid } })
}) (GroupRouted);



const GroupView = ({ match }) => (
    <Switch>
        <Route path={match.url + "/:uid"} component={GroupWithGraphQL} />
        <Route component={Error404} />
    </Switch>
);

export default GroupView;
