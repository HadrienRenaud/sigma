import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Dropdown, Image, List, Menu, Message, Search} from 'semantic-ui-react';

import gql from "graphql-tag";
import {Query} from "react-apollo";
import {GQLError} from "../../utils/Errors.jsx";
import {Link} from "react-router-dom";

const GET_MEMBERS = gql`
    query getMembers($gid: ID!) {
        group(gid: $gid) {
            ... on SimpleGroup {
                admins {
                    uid
                    lastName
                    givenName
                }
                members {
                    uid
                    lastName
                    givenName
                }
                speakers {
                    uid
                    lastName
                    givenName
                }
                likers {
                    uid
                    lastName
                    givenName
                }
            }
            ...on MetaGroup {
                admins {
                    uid
                    lastName
                    givenName
                }
                members {
                    gid
                    name
                    website
                }
            }
        }
    }
`;

const simpleGroupFilters = [
    {key: 0, value: "admins", text: "Admins", disabled: false, icon: "chess queen"},
    {key: 1, value: "speakers", text: "Speakers", disabled: false, icon: "bullhorn"},
    {key: 2, value: "members", text: "Members", disabled: false, icon: "heart"},
    {key: 3, value: "likers", text: "Likers", disabled: false, icon: "eye"},
];

const metaGroupFilters = [
    {key: 0, value: "admins", text: "Admins", disabled: false, icon: "chess queen"},
    {key: 1, value: "speakers", text: "Speakers", disabled: true, icon: "bullhorn"},
    {key: 2, value: "members", text: "Members", disabled: false, icon: "heart"},
    {key: 3, value: "likers", text: "Likers", disabled: true, icon: "eye"},
];

class GroupMembers extends Component {
    state = {
        filter: "admins",
    };

    filters = simpleGroupFilters;

    componentDidMount() {
        if (this.props.typename === "MetaGroup")
            this.filters = metaGroupFilters;
    }

    handleSelectedFilter(e, {value}) {
        e.preventDefault();
        this.setState({filter: value});
    }

    render() {
        return <div>
            <Menu secondary>
                <Menu.Item>
                    <Dropdown
                        options={this.filters}
                        onChange={this.handleSelectedFilter.bind(this)}
                        selection
                        defaultValue={this.filters[0].value}
                    />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Search placeholders={"Search in " + this.state.filter + " ... "}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <List>
                <Query query={GET_MEMBERS} variables={{gid: this.props.gid}} fetchPolicy="cache-first">
                    {({loading, error, data}) => {
                        if (loading)
                            return <Message info content="Chargement en cours ..."/>;
                        else if (error)
                            return <GQLError error={error}/>;
                        if (data.group.__typename !== this.props.typename)
                            return <Message error>
                                Le type du groupe requis est différent du groupe reçu...
                            </Message>;
                        let users = [];
                        if (this.state.filter === 'members')
                            users = data.group.members;
                        else if (this.state.filter === 'speakers')
                            users = data.group.speakers;
                        else if (this.state.filter === 'admins')
                            users = data.group.admins;
                        else
                            users = data.group.likers;
                        if (this.props.typename === "MetaGroup" && this.state.filter === 'members')
                            return users.map(group =>
                                <List.Item key={group.gid} as="a" href={'/group/' + group.gid}>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                                    <List.Content content={group.name}/>
                                </List.Item>
                            );
                        else
                            return users.filter(user => !!user).map(user =>
                                <List.Item key={user.uid}>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                    />
                                    <List.Content as={Link} to={'/user/' + user.uid}>
                                        <List.Header>
                                            {user.givenName} {user.lastName}
                                        </List.Header>
                                        <List.Description>
                                            @{user.uid}
                                        </List.Description>
                                    </List.Content>
                                    <List.Content floated="right">
                                        <Button icon="remove" color="red" labelPosition='left'
                                            content={"Remove from " + this.state.filter}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log("User wants to delete him from users.");
                                            }}
                                        />
                                    </List.Content>
                                </List.Item>);
                    }}
                </Query>
            </List>
        </div>;
    }
}

export default GroupMembers;
