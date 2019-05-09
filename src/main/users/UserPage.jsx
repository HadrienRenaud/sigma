/**
 * @file Component carte presentant toutes les informations sur un user
 * @file Utilisé à la fois pour afficher les resultats de la recherche TOL et au path="baseurl/users/:uid"
 * @author manifold
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Image, Container, Header, Icon, Item, List, Segment, Menu, Search, Accordion} from 'semantic-ui-react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {GQLError} from "../Errors.jsx";
import {Link, Redirect} from "react-router-dom";

function iterateGroup(group, groupList) {
    return group;
}

function constructGraph(groups, asked = "parents") {
    let gidToGroup = {};
    for (let i = 0; i < groups.length; i++)
        gidToGroup[groups[i].gid] = groups[i];
    for (let i = 0; i < groups.length; i++) {
        let children = groups[i][asked];
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
            mail
            phone
            address
            promotion
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

class UserPage extends React.Component {
    state = {
        groupView: 'member',
        redirect: "",
    };

    renderGroupTree(gid) {
        let gr = this.gidToGroup[gid];

        return <List.Item key={gid}>
            <Image avatar
                   src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'/>
            <List.Content>
                <List.Header as={Link} to={'/groups/' + gr.gid}>
                    {gr.name}
                </List.Header>
                <List.Description>
                    {gr.description}
                </List.Description>
                <List.List>
                    {gr.parents.map(g => this.renderGroupTree(g.gid))}
                </List.List>
            </List.Content>
        </List.Item>;
    }

    constructor() {
        super();
        this.renderGroupTree = this.renderGroupTree.bind(this);
    }

    render() {

        let uid = this.props.uid;
        if (this.props.match)
            uid = this.props.match.params.uid;

        return (
            <Query query={GET_USER}
                   variables={{uid: uid}}
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
                    console.log(this.gidToGroup);

                    let stateToGroup = {
                        admin: user.adminOf,
                        speaker: user.speakerOf,

                        // THIS IS WRONG. But the mocker doesn't guarantee memberOf in inheritedMemberOf
                        member: user.inheritedMemberOf,

                        likes: user.likes,
                        dislikes: user.dislikes,
                    };

                    return (
                        <div>
                            <Segment vertical>
                                <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                                       floated='right' size='small'/>
                                <Header>
                                    {user.givenName} {user.lastName}
                                </Header>
                                <p>
                                    <Icon name="mail"/>
                                    <a href={`mailto:${user.mail}`}>{user.mail}</a>
                                </p>
                                {user.address ? <p>
                                        <Icon name='marker'/>
                                        {user.address[0]}
                                    </p>
                                    : ""
                                }
                                <p>
                                    <Icon name="group"/>
                                    Promotion : {user.promotion}
                                </p>
                            </Segment>
                            <Segment vertical>
                                <Menu secondary pointing>
                                    <Menu.Item>
                                        <Header>
                                            Groupes
                                        </Header>
                                    </Menu.Item>
                                    <Menu.Item active={this.state.groupView === 'dislikes'}
                                               onClick={() => this.setState({groupView: 'dislikes'})}>
                                        Dislikes
                                    </Menu.Item>
                                    <Menu.Item active={this.state.groupView === 'likes'}
                                               onClick={() => this.setState({groupView: 'likes'})}>
                                        Likes
                                    </Menu.Item>
                                    <Menu.Item active={this.state.groupView === 'member'}
                                               onClick={() => this.setState({groupView: 'member'})}>
                                        Membre
                                    </Menu.Item>
                                    <Menu.Item active={this.state.groupView === 'speaker'}
                                               onClick={() => this.setState({groupView: 'speaker'})}>
                                        Speaker
                                    </Menu.Item>
                                    <Menu.Item active={this.state.groupView === 'admin'}
                                               onClick={() => this.setState({groupView: 'admin'})}>
                                        Admin
                                    </Menu.Item>
                                    <Menu.Menu position="right">
                                        <Menu.Item>
                                            <Search disabled/>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                                <List relaxed>
                                    {user.memberOf.map(gr =>
                                        <List.Item key={gr.gid}>
                                            <Image avatar
                                                   src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'/>
                                            <List.Content>
                                                <List.Header as={Link} to={'/groups/' + gr.gid}>
                                                    {gr.name}
                                                </List.Header>
                                                <List.Description>
                                                    {gr.description}
                                                </List.Description>
                                                {this.state.groupView === "member" &&
                                                <Accordion>
                                                    <Accordion.Title active={this.state["groupIsActive:" + gr.gid]}
                                                                     onClick={() => {
                                                                         let state = {};
                                                                         if (this.state["groupIsActive:" + gr.gid])
                                                                             state["groupIsActive:" + gr.gid] = false;
                                                                         else
                                                                             state["groupIsActive:" + gr.gid] = true;
                                                                         this.setState(state);
                                                                     }}
                                                    >
                                                        <Icon name="dropdown"/>
                                                        Expand
                                                    </Accordion.Title>
                                                    <Accordion.Content active={this.state["groupIsActive:" + gr.gid]}>
                                                        <List.List>
                                                            {this.gidToGroup[gr.gid] &&
                                                            this.gidToGroup[gr.gid].parents.map(g => this.renderGroupTree(g.gid))}
                                                        </List.List>
                                                    </Accordion.Content>
                                                </Accordion>
                                                }
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                            <Segment vertical>
                                <Menu secondary pointing>
                                    <Menu.Item>
                                        <Header>
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
                                    {user.questionsFromUser.map(q =>
                                        <List.Item key={q.mid}
                                                   onClick={() => this.setState({redirect: "/question/" + q.mid})}>
                                            <List.Icon name="question"/>
                                            <List.Content>
                                                <List.Header>
                                                    To <Link to={'/groups/' + q.recipient.gid + '/qanda'}>
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
                        </div>
                    );
                }}
            </Query>
        );
    }

}

export default UserPage;