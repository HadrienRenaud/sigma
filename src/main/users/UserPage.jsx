/**
 * @file Component carte presentant toutes les informations sur un user
 * @file Utilisé à la fois pour afficher les resultats de la recherche TOL et au path="baseurl/users/:uid"
 * @author manifold
 */

import React from 'react';
import {Image, Header, Icon, List, Segment, Menu, Search, Grid, Button} from 'semantic-ui-react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {GQLError} from "../Errors.jsx";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../utils/contexts.jsx";
import {UserMemberships} from "./UserMemberships";

function constructGraph(groups, asked = "parents") {
    const gidToGroup = {};
    for (let i = 0; i < groups.length; i++)
        gidToGroup[groups[i].gid] = groups[i];
    for (let i = 0; i < groups.length; i++) {
        const children = groups[i][asked];
        if (children)
            for (let i = 0; i < children.length; i++) {
                children[i] = gidToGroup[children[i]['gid']];
            }
    }
    return gidToGroup;
}

const GET_USER = gql`
    # Write your query or mutation here
    query getUser($uid: ID!) {
        user(uid: $uid) {
            lastName
            givenName
            nationality
            nickname
            mail
            phone
            address
            birthdate
            photo
            memberOf {
                gid
                name
                description
            }
            adminOf {
                gid
                name
                description
            }
            speakerOf {
                gid
                name
                description
            }
            likes {
                gid
                name
                description
            }
            dislikes {
                gid
                name
                description
            }
            inheritedMemberOf {
                gid
                name
                description
            }
            inheritedAdminOf {
                gid
                name
                description
            }
            questionsFromUser {
                mid
                title
                content
                recipient {
                    gid
                    name
                }
            }
        }
    }
`;

const SMALL_GET_USER = gql`
    query getUser($uid: ID!) {
        user(uid: $uid) {
            lastName
            givenName
            nationality
            nickname
            mail
            phone
            address
            birthdate
            photo
            speakerOf {
                gid
                name
                description
            }
            inheritedMemberOf {
                gid
                name
                description
            }
            inheritedAdminOf {
                gid
                name
                description
            }
        }
    }
`;

class UserPage extends React.Component {
    state = {
        groupView: 'member',
        redirect: "",
    };

    renderMembershipMenu() {
        return <Menu secondary pointing>
            <Menu.Item>
                <Header>
                    <Icon name="group"/>
                    Groupes
                </Header>
            </Menu.Item>
            {this.props.uid === this.context.uid &&
            <Menu.Item
                active={this.state.groupView === 'dislikes'}
                onClick={() => this.setState({groupView: 'dislikes'})}
                icon="eye slash"
                name="Dislikes"
            />}
            <Menu.Item
                active={this.state.groupView === 'likes'}
                onClick={() => this.setState({groupView: 'likes'})}
                icon="eye"
                name="Likes"
            />
            <Menu.Item
                active={this.state.groupView === 'member'}
                onClick={() => this.setState({groupView: 'member'})}
                icon="heart"
                name="Member"
            />
            <Menu.Item
                active={this.state.groupView === 'speaker'}
                onClick={() => this.setState({groupView: 'speaker'})}
                icon="bullhorn"
                name="Speaker"
            />
            <Menu.Item
                active={this.state.groupView === 'admin'}
                onClick={() => this.setState({groupView: 'admin'})}
                icon="chess queen"
                name="Admin"
            />
            <Menu.Menu position="right">
                <Menu.Item>
                    <Search disabled/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>;
    }

    render() {
        let uid = "";
        if (this.props.match && this.props.match.params.uid) // route = /user/:uid
            uid = this.props.match.params.uid;
        else
            uid = this.context.uid;

        return (
            <Query
                query={SMALL_GET_USER}
                variables={{uid}}
            >
                {({loading, error, data}) => {
                    if (this.state.redirect)
                        return <Redirect to={this.state.redirect}/>;
                    else if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <GQLError error={error}/>;

                    const {user} = data;
                    this.gidToGroup = constructGraph(user.inheritedMemberOf);

                    return (
                        <>
                            <Segment vertical>
                                <Grid divided='vertically' stackable={true}>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <Header>
                                                {user.givenName} {user.lastName} ({user.nickname})
                                                <Header.Subheader>@{this.props.uid || this.context.uid}</Header.Subheader>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign={'right'}>
                                            {uid === this.context.uid &&
                                            <Button
                                                basic
                                                icon='edit'
                                                content="Edit profile"
                                                as={Link} to='/me/edit-profile'
                                            />}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                        <Grid.Column>
                                            <List>
                                                <List.Item icon="birthday" content={user.birthdate}/>
                                                <List.Item icon="flag outline" content={user.nationality}/>
                                                <List.Item icon="phone">
                                                    <a href={"tel:" + user.phone}>
                                                        {user.phone}
                                                    </a>
                                                </List.Item>
                                                {user.address && <List.Item icon="marker" content={user.address}/>}
                                                <List.Item
                                                    icon="mail"
                                                    content={<a href={`mailto:${user.mail}`}>{user.mail}</a>}
                                                />
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column textAlign='right' floated='right'>
                                            <Image
                                                src={user.photo || "https://react.semantic-ui.com/images/wireframe/square-image.png"}
                                                size='small' floated='right'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <Segment vertical>
                                {this.renderMembershipMenu()}
                                <UserMemberships
                                    displayedGroups={user.inheritedMemberOf.map(({gid}) => this.gidToGroup[gid])}
                                    allGroups={this.gidToGroup}
                                    expanded={this.state.groupView === "member"}
                                />
                            </Segment>
                            <Segment vertical>
                                <Menu secondary pointing>
                                    <Menu.Item>
                                        <Header>
                                            <Icon name="question"/>
                                            Questions à des groupes
                                        </Header>
                                    </Menu.Item>
                                    <Menu.Menu position="right">
                                        <Menu.Item>
                                            <Search disabled/>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                                <List relaxed>
                                    {user.questionsFromUser && user.questionsFromUser.map(q =>
                                        <List.Item
                                            key={q.mid}
                                            onClick={() => this.setState({redirect: "/question/" + q.mid})}>
                                            <Image
                                                avatar
                                                src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'/>
                                            <List.Content>
                                                <List.Header>
                                                    To
                                                    <Link to={'/group/' + q.recipient.gid + '/qanda'}>
                                                        {q.recipient.name}
                                                    </Link> : {q.title}
                                                </List.Header>
                                                <List.Description>
                                                    {q.content}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                        </>
                    );
                }}
            </Query>
        );
    }

}

UserPage.contextType = UserContext;
export default UserPage;
