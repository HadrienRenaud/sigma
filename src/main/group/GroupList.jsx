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
            uid
            name
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
            return <ul>Loading...</ul>;
        } else if (error) {
            return <ul>Error</ul>;
        }

        console.log(JSON.stringify(allGroups));

        return (
            <ul>
                {allGroups.map(item => <ol key={item.uid}>
                    <li>Name:{item.name}</li> 
                    <li>Website:{item.website}</li>
                </ol>)}
            </ul>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(GroupList);
