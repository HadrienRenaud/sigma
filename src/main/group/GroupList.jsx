import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Link } from 'react-router-dom';

import { Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';


/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
const GET_ALLGROUPS = gql`
    query GroupQuery {
        accessGroups {
            allGroups {
                uid
                name
                website
            }
        }
    }
`;
/**
 * @class Liste des groupes.
 * @author manifold
 */
class GroupList extends React.Component {

    render() {
        const { groupQuery: { loading, error, accessGroups } } = this.props;

        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <li>Error</li>;
        }

        return (
            <ul>
                {accessGroups.allGroups.map(item => 
                    <li key={item.uid}>
                        <ul>
                            <li>Nom : {item.name} </li>
                            <li>Site : {item.website}</li>
                        </ul>
                    </li>
                )}
            </ul>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(GroupList);
