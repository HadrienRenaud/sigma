/**
 * @file La page principale d'un groupe ! Regroupera presentation, annonces, administrations...
 * @author manifold
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import { Header, Button, Container, Icon, Popup, Label, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import GroupAnnouncements from './group_view/GroupAnnouncements.jsx';
import GroupEvents from './group_view/GroupEvents.jsx';
import GroupMembers from './group_view/GroupMembers.jsx';
import GroupSettings from './group_view/GroupSettings.jsx';

const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        group(uid: $uid) {
            uid
            name
            website
            description
            createdAt
            updatedAt
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
        const { data: { loading, error, group } } = this.props;

        console.log("Match:", match);
        console.log("Where:", location);
        console.log("History:", history);

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

const GroupRouted = withRouter(GroupUnrouted);

const GroupWithGraphQL = graphql(GET_GROUP, {
    options: ({ match }) => ({ variables: { uid: match.params.uid } })
}) (GroupRouted);

/*
 * graphql(.,.) peut pour parametres :
 * 1. la requete graphql (defini par gql `...`)
 * 2. un objet JSON qui contient les options, notamment les variables (a inserer ds la requete graphql)
 *    par exemple :
 *    options: {
 *        variables: {
 *            uid: 'MOI' //parce que je suis egoiste
 *        }
 *    }
 *    Alternativement, les options peuvent etre un callback (comme ci-dessus d'ailleurs) prenant les props passes au composant,
 *    et qui renvoie variables
 * et renvoie un callback (i.e. une fonction) prenant en argument un Component React
 * ce callback "wrappe" le Component avec (i.e. renvoie un Component identique mais qui a en plus) un champ "data" dans ses props.
 * c'est dans ce props "data" que se trouvent les resultats de la requete graphQL.
 */


const GroupView = ({ match }) => (
    <Switch>
        <Route path={match.url + "/:uid"} component={GroupWithGraphQL} />
        <Route component={Error404} />
    </Switch>
);

export default GroupView;
