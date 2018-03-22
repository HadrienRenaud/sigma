import React from 'react';
import {
    Form, Button, Input, Container, Divider,
    Grid, Header, Menu, Message, Segment, Table
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

        this.state = {
            uid: props.query.uid
        };
    
    }

    componentWillReceiveProps(newProps) {
        this.setState({ uid: newProps.query.uid });
    }

    render() {

        return (
            <Query query={GET_TROMBINO}
                variables={{ uid: this.props.query.uid }}
                errorPolicy='all'>
                {({ loading, error, data, refetch}) => {
                    if (loading) return <div>Chargement, patience SVP...</div>;
                    else if (error) return <div>Pas trouvé.</div>;

                    const { user } = data;

                    return <UserCard givenName={user.givenName} lastName={user.lastName} mail={user.mail} 
                        address={user.address} groups={user.groups} />;

                }}
            </Query>
        );
    }
}

export default TrombinoResults;
