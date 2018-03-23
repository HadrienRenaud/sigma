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
    query trombinoQuery(
        $givenName: String,
        $lastName: String,
        $nickname: String,
        $groups: String
    ) {
        searchTOL(givenName: $givenName, 
            lastName: $lastName,
            nickname: $nickname,
            groups: $groups)
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
        console.log(newProps);
    }

    render() {

        return (
            <Query query={GET_TROMBINO}
                variables={{
                    givenName: this.props.params.givenName, 
                    lastName: this.props.params.lastName,
                    nickname: this.props.params.nickname,
                    groups: this.props.params.groups
                }}
                pollInterval={600}
                fetchPolicy='cache-first' >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div>Chargement, patience SVP...</div>;
                    else if (error) return <div>Erreur.</div>;

                    const { searchTOL } = data;
                    
                    return (
                        <div>
                            {searchTOL.map(res => {
                                return <UserCard key={res} uid={res} />;
                            })}
                        </div>
                    );

                }}
            </Query>
        );
    }
}

export default TrombinoResults;
