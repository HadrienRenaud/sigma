/**
 * @file Page rassemblant tous les groupes visibles par l'utilisateur, à afficher pour path="baseurl/groups/"
 * @author kadabra
 */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GroupCard from './GroupCard.jsx';
import {GQLError} from "../Errors.jsx";

const groupReq = gql`
    query {
        allGroups {
            gid
            name
            description
        }
    }
`;

class AllGroups extends React.Component {
    
    loadGroups = ({ loading, error, data }) => {
        if (loading) return <div>Chargement...</div>;
        else if (error) {
            console.log(error.name);
            console.log(error.message);
            return <GQLError error={error}/>;
        }

        const { allGroups } = data;

        return <div>
            {allGroups.map((group) => <GroupCard key={group.gid} gid={group.gid} />)}
        </div>;
    }

    render() {
        return (
            <Query query={groupReq} fetchPolicy='cache-first'>
                {this.loadGroups}
            </Query>
        );
    }
}

export default AllGroups;
