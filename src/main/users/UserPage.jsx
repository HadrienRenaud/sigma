/**
 * @file Component carte presentant toutes les informations sur un user
 * @file Utilisé à la fois pour afficher les resultats de la recherche TOL et au path="baseurl/users/:uid"
 * @author manifold
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Card, Container, Header, List} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {GQLError} from "../Errors.jsx";

const GET_USER = gql`
    query getUser($uid: ID) {
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
            }
        }
    }
`;

class UserPage extends React.Component {

    render() {

        let uid = this.props.uid;
        if (this.props.match)
            uid = this.props.match.params.uid;

        return (
            <Query query={GET_USER}
                   variables={{ uid: uid }}
            >
                {({ loading, error, data }) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <GQLError error={error}/>;

                    const { user } = data;

                    return (
                        <div>
                            <Header as='h2'>
                                {user.givenName} {user.lastName}
                            </Header>
                            <List>
                                <List.Item
                                    icon='mail'
                                    content={<a href={`mailto:${user.mail}`}>{user.mail}</a>}
                                />
                                {
                                    user.address ?
                                        <List.Item>
                                            <List.Icon name='marker' />
                                            <List.Content>{user.address[0]}</List.Content>
                                        </List.Item>
                                        : ""
                                }
                                <List.Item>
                                    <List.Icon name="group" />
                                    <List.Content>
                                        Groupes :
                                        <List>
                                            {user.groups.map(gr =>
                                                <List.Item key={gr.uid}>{gr.name}</List.Item>
                                            )}
                                        </List>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name="group" />
                                    <List.Content>
                                        Promotion : {user.promotion}
                                    </List.Content>
                                </List.Item>
                            </List>
                        </div>
                    );
                }}
            </Query>
        );
    }

}

export default UserPage;