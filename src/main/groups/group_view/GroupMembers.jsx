import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Dropdown, Image, List, Menu, Message, Search} from 'semantic-ui-react';

import gql from "graphql-tag";
import {Query} from "react-apollo";
import {GQLError} from "../../Errors.jsx";
import {Link} from "react-router-dom";

const GET_MEMBERS = gql`
    query getMembers($gid: ID!) {
        __typename
        group(gid: $gid) {
            ... on SimpleGroup {
                admins {
                    uid
                    lastName
                    givenName
                    promotion
                }
                members {
                    uid
                    lastName
                    givenName
                    promotion
                }
                speakers {
                    uid
                    lastName
                    givenName
                    promotion
                }
                likers {
                    uid
                    lastName
                    givenName
                    promotion
                }
            }
            ...on MetaGroup {
                admins {
                    uid
                    lastName
                    givenName
                    promotion
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

class GroupMembers extends Component {
    state = {
        filter: "admins",
    };

    filters = [];

    componentWillMount() {
        if (this.props.typename === "MetaGroup")
            this.filters = [
                {key: 0, value: "admins", text: "Admins", disabled: false},
                {key: 1, value: "speaker", text: "Speakers", disabled: true},
                {key: 2, value: "members", text: "Members", disabled: false},
                {key: 3, value: "likers", text: "Likers", disabled: true},
            ];
        else
            this.filters = [
                {key: 0, value: "admins", text: "Admins", disabled: false},
                {key: 1, value: "speaker", text: "Speakers", disabled: false},
                {key: 2, value: "members", text: "Members", disabled: false},
                {key: 3, value: "likers", text: "Likers", disabled: false},
            ];
    }

    handleSelectedFilter(e, {value}) {
        e.preventDefault();
        this.setState({filter: value});
    }

    render() {
        return <div>
            <Menu secondary>
                <Menu.Item>
                    <Dropdown options={this.filters}
                              onChange={this.handleSelectedFilter.bind(this)}
                              selection
                              defaultValue={this.filters[0].value}
                    />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Search/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <List>
                <Query query={GET_MEMBERS} variables={{gid: this.props.gid}} fetchPolicy="cache-first">
                    {({loading, error, data}) => {
                        console.log(data);
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
                            return users.map(user =>
                                <List.Item key={user.uid} as={Link} to={'/users/' + user.uid}>
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                                    <List.Content>
                                        {user.givenName} {user.lastName} ({user.promotion})
                                    </List.Content>
                                </List.Item>);
                    }}
                </Query>
            </List>
        </div>;
    }
}

export default GroupMembers;
;