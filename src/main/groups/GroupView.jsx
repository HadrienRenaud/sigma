/**
 * @file La page principale d'un groupe ! Regroupera presentation, annonces, administrations...
 * @file a afficher pour path="baseurl/groups/:g
 * id"
 * @author manifold
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, NavLink, Link, withRouter, Redirect} from 'react-router-dom';
import {Error404} from '../Errors.jsx';
import {Menu, Header, Button, Container, Icon, Popup, Label, Segment, Card} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import ReactMarkdown from 'react-markdown';

import GroupAnnouncements from './group_view/GroupAnnouncements.jsx';
import GroupQanda from './group_view/GroupQanda.jsx';
import GroupPageInterne from './group_view/GroupPageInterne.jsx';
import GroupAdministrer from './group_view/GroupAdministrer.jsx';
import GroupFrontPage from './group_view/GroupFrontPage.jsx';
import GroupEvents from './group_view/GroupEvents.jsx';
import {GQLError} from "../Errors.jsx";
import GroupMembers from "./group_view/GroupMembers.jsx";
import {UserContext} from "../utils/contexts.jsx";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";

const SMALL_GET_GROUP = gql`
query getGroup($gid: ID!) {
  group(gid: $gid) {
    gid
    name
    website
    mail
    description
    __typename
  }
}
`;

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            gid
            name
            website
            mail
            description
            createdAt
            updatedAt
            frontPage
            __typename
            visibilityEdges {
                name
                gid
            }
        }
    }
`;


class GroupView extends React.Component {
    state = {};

    static propTypes = {
        match: PropTypes.object.isRequired,
    };

    render() {

        const {match} = this.props;

        const user = {adminOf: [], speakerOf: [], memberOf: [], likes: [], dislikes: [], ...this.context};
        const isAdmin = (this.props.gid in user.adminOf.map((g) => g.gid)) || true;
        const isSpeaker = isAdmin || (this.props.gid in user.speakerOf.map((g) => g.gid));
        const isMember = isSpeaker || (this.props.gid in user.memberOf.map((g) => g.gid));
        const isLiking = isMember || (this.props.gid in user.likes.map((g) => g.gid));
        const isDisliking = (this.props.gid in user.dislikes.map((g) => g.gid));

        return (
            <Query
                query={SMALL_GET_GROUP}
                variables={{
                    gid: match.params.gid
                }}
                fetchPolicy='cache-first' //choose cache behaviour
            >
                {({loading, error, data}) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <GQLError error={error}/>;

                    const {group} = data; //extracts the actual data from object 'data'

                    return (
                        <Container>
                            <Menu secondary>
                                <Menu.Item>
                                    <Header as="h1">
                                        {group.name}
                                        <Header.Subheader>
                                            <a href={`${group.website}`}>{group.website}</a>
                                        </Header.Subheader>
                                    </Header>
                                </Menu.Item>

                                <Menu.Item position="right">
                                    <Button.Group>
                                        <Popup
                                            trigger={<Button color='purple' icon='chess queen'/>}
                                            content={isAdmin ? "Ne plus être administrateur" : 'Devenir administrateur'}
                                            position='top left'
                                            inverted={!isAdmin}
                                        />
                                        <Popup
                                            trigger={<Button color='violet' icon='bullhorn'/>}
                                            content={isSpeaker ? "Devenir Speaker" : 'Devenir speaker'}
                                            position='top left'
                                            inverted={!isSpeaker}
                                        />
                                        <Popup
                                            trigger={<Button color='blue' icon='heart'/>}
                                            content={isMember ? "Ne plus être membre" : 'Devenir membre'}
                                            position='top left'
                                            inverted={!isMember}
                                        />
                                        <Popup
                                            trigger={<Button color='green' icon='eye'/>}
                                            content={isLiking ? "Ne plus être sympathisant" : 'Devenir Sympathisant'}
                                            position='top left'
                                            inverted={!isLiking}
                                        />
                                        <Popup
                                            trigger={<Button color='yellow' icon='eye slash'/>}
                                            content={isDisliking ? "Suivre" : 'Ne pas suivre'}
                                            position='top left'
                                            inverted={!isDisliking}
                                        />
                                    </Button.Group>
                                </Menu.Item>
                            </Menu>

                            <Segment basic>
                                <ReactMarkdown source={group.description}/>
                            </Segment>

                            {/*voir le react-router.Switch plus bas pour voir quels components sont générés*/
                            }
                            <Menu pointing secondary color="purple">
                                <Menu.Item
                                    as={NavLink} exact to={match.url}
                                    content="Page d'accueil"/>
                                <Menu.Item
                                    as={NavLink} to={match.url + "/annonces"}
                                    content="Annonces"/>
                                <Menu.Item
                                    as={NavLink} to={match.url + "/qanda"}
                                    content="Questions-Réponses"/>
                                <Menu.Item
                                    as={NavLink} to={match.url + "/events"}
                                    content="Événements"/>
                                <Menu.Item
                                    as={NavLink} to={match.url + "/members"}
                                    content="Membres"/>
                                {isMember &&
                                <Menu.Item
                                    as={NavLink} to={match.url + "/interne"}
                                    position='right'
                                    content="Page interne"/>} {/* Réservé aux membres du groupe */}
                                {isAdmin &&
                                <Menu.Item
                                    as={NavLink} to={match.url + "/admin"}
                                    content="Administrer"/>} {/*réservé aux administrateurs du groupe*/}
                            </Menu>


                            < Switch>
                                {/*Pour passer des props aux Component enfants, on est obliges d'utiliser render={...} a la place de component={...}*/
                                }
                                <Route
                                    exact path={`${match.url}`}
                                    render={() => <GroupFrontPage frontPage={group.frontPage}
                                        isSpeaker={isSpeaker}/>}
                                />
                                <Route
                                    path={match.url + "/annonces"}
                                    render={() => <GroupAnnouncements gid={group.gid}/>}
                                />
                                <Route
                                    path={`${match.url}/qanda`}
                                    render={() => <GroupQanda gid={group.gid} isSpeaker={isSpeaker}/>}/>
                                <Route
                                    path={match.url + "/events"} component={GroupEvents}/>
                                <Route
                                    path={match.url + "/members"}
                                    component={() => <GroupMembers gid={group.gid} typename={group.__typename}/>}
                                />
                                <Route
                                    path={match.url + "/interne"}
                                    component={isMember ? GroupPageInterne : () => (
                                        <Message
                                            error header="Droits insuffisants"
                                            content="Il faut être membre du groupe pour accéder à la page interne."
                                        />)}/>
                                <Route path={match.url + "/admin"}
                                    render={() => {
                                        if (isAdmin)
                                            return <GroupAdministrer isAdmin={isAdmin} g={group}/>;
                                        else
                                            return <Message error header="Droits insuffisants">
                                                   Il faut être admin du groupe pour accéder à la page d'administration.
                                            </Message>;
                                    }}/>
                                <Route component={Error404}/>
                            </Switch>
                        </Container>);
                }}
            </Query>
        );
    }
}

GroupView.contextType = UserContext;

export default withRouter(GroupView);
//export default GroupViewWithRouter;
