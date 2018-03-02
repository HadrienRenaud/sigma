import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Link } from 'react-router-dom';

import faker from 'faker';

import { Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';


/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
const GET_ALLGROUPS = gql`
    query GroupQuery {
        allGroups {
            name
            id
            website
            school
        }
    }
`;
/**
 * @description Liste de groupes
 */
class GroupList extends React.Component {

    render() {
        const { groupQuery: { loading, error, allGroups } } = this.props;

        if (loading) {
            return <div>Loading...</div>;
        } else if (error) {
            return <div>Error</div>;
        }
        return (
            <div>Pomme de terre.</div>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(GroupList);
