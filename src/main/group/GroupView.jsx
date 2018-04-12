/**
 * @file La page principale d'un groupe ! Regroupera presentation, annonces, administrations...
 * @file a afficher pour path="baseurl/groups/:uid"
 * @author manifold
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, NavLink, Link, withRouter, Redirect } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import { Menu, Header, Button, Container, Icon, Popup, Label, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import GroupAnnouncements from './group_view/GroupAnnouncements.jsx';
import GroupQanda from './group_view/GroupQanda.jsx';
import GroupPageInterne from './group_view/GroupPageInterne.jsx';
import GroupAdministrer from './group_view/GroupAdministrer.jsx';
import GroupFrontPage from './group_view/GroupFrontPage.jsx';
import GroupEvents from './group_view/GroupEvents.jsx';

const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        group(uid: $uid) {
            uid
            name
            website
            description
            createdAt
            updatedAt
            # frontPage # TODO: modifier le schema graphQL et decommenter cette ligne
        }
    }
`;


class GroupView extends React.Component { //TODO change into semantic-ui-react
    state = {}

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    setContextRef = contextRef => this.setState({ contextRef })

    render() {
        
        const { contextRef } = this.state;
        const { match } = this.props;
        
        // 
        const { data: { loading, error, group } } = this.props;
        
        // TODO: modifier le schema graphQL et decommenter cette ligne
        const fakeFrontPage="_this is a markdown string_ Fake group front page. Must modify *graphQL schema* before we can implement this";

        console.log("Match:", match);

        //
        if (loading) {
            return <div>Please wait...</div>;
        } else if (error) {
            return <div>Error {error}</div>;
        }

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
                    <Menu.Item as={NavLink} exact to={match.url + "/"}
                        content="Page d'accueil" />
                    <Menu.Item as={NavLink} to={match.url + "/annonces"}
                        content="Annonces" />
                    <Menu.Item as={NavLink} to={match.url + "/qanda"}
                        content="Questions-Réponses" />
                    <Menu.Item as={NavLink} to={match.url + "/events"}
                        content="Événements" />

                    <Menu.Item as={NavLink} to={match.url + "/interne"}
                        position='right'
                        content="Page interne" /> {/*réservé aux membres du groupe*/}
                    <Menu.Item as={NavLink} to={match.url + "/admin"}
                        content="Administrer" /> {/*réservé aux administrateurs du groupe*/}
                </Menu>

                <Segment attached>
                    <Switch>
                        {/*la premiere chose qu'on voit en arrivant sur la page*/}
                        {/*TODO: modifier le schema graphQL et remplacer :
                        fakeFrontPage par group.frontPage*/}
                        {/*Pour passer des props aux Component enfants, on est obliges d'utiliser render={...} a la place de component={...}*/}
                        <Route exact path={match.url + "/"}
                            render={() => <GroupFrontPage frontPage={fakeFrontPage}/> } 
                        />
                        <Route path={match.url + "/annonces"} component={GroupAnnouncements} />
                        <Route path={match.url + "/qanda"} component={GroupQanda} />
                        <Route path={match.url + "/events"} component={GroupEvents} />
                        <Route path={match.url + "/interne"} component={GroupPageInterne} />
                        <Route path={match.url + "/admin"} component={GroupAdministrer} />
                        <Route component={Error404} />
                    </Switch>
                </Segment>


            </Container>
        );
    }
}

const GroupViewWithGraphQL = graphql(GET_GROUP, {
    options: ({ match }) => ({ variables: { uid: match.params.uid } })
}) (GroupView);

export default GroupViewWithGraphQL;
