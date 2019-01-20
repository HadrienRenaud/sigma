/**
 * @file Page rassemblant tous les groupes visibles par l'utilisateur, à afficher pour path="baseurl/groups/"
 * @author kadabra
 */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GroupCard from '../widgets/GroupCard.jsx';
import GraphQLError from "../errors/GraphQLError.jsx";

const groupReq = gql`
    query {
        allGroups {
            uid
            name
            description
        }
    }
`;

class AllGroups extends React.Component {
    
    loadGroups = ({ loading, error, data }) => {
        if (loading) return <div>Chargement...</div>;
        else if (error)
            return <GraphQLError error={error}/>;

        const { allGroups } = data;

        return <div>
            {allGroups.map((group) => <GroupCard key={group.uid} uid={group.uid} />)}
        </div>;
    };

    render() {
        return (
            <Query query={groupReq} fetchPolicy='cache-first'>
                {this.loadGroups}
            </Query>
        );
    }
}

export default AllGroups;
