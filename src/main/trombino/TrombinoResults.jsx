import React from 'react';
import {
    Form, Button, Input, Container, Divider,
    Grid, Header, Menu, Message, Segment, Table
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import UserCard from '../member/UserCard.jsx';

/** 
 * @constant Requête GraphQL...
*/
const GET_TROMBINO = gql`
    query trombinoQuery($uid: ID!) {
        user(uid: $uid) {
            lastName
            givenName
            mail
            address
            groups {
                uid 
                name
            }
        }
    }
`;

/**
 * @class Affiche les résultats tu trombinoscope
 */
class TrombinoResults extends React.Component {

    constructor(props) {
        super(props);
    
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.query);
    }

    render() {

        const { data: { loading, error, user } } = this.props;

        if (loading) {
            return (
                <div>
                    {loading}
                    <p>Chargement, patience s'il vous plaît...</p>
                </div>
            );
        } else if (error) {
            return (
                <div>
                    {error}
                    <p>Erreur</p>
                </div>
            );
        }

        return (
            <div>
                <UserCard givenName={user.givenName} lastName={user.lastName} mail={user.mail} 
                    address={user.address} groups={user.groups} />
            </div>
        );
    }
}

export default graphql(GET_TROMBINO, {
    options: ({props}) => ({ variables: { uid: "guillaume.wang" } })
})(TrombinoResults);
