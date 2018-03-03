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
        allGroups {
            uid
            name
            website
            school
        }
    }
`;
/**
 * @class Liste des groupes.
 * @author manifold
 */
class GroupList extends React.Component {

    render() {
        const { groupQuery: { loading, error, allGroups } } = this.props;

        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <li>Error</li>;
        }

        console.log(JSON.stringify(allGroups));

        return (
            <ul>
                {allGroups.map(item => 
                    <li key={item.uid}>Groupe : {item.name}
                        <ul> 
                            <li>École : {item.school}</li>
                            <li>Site : <a href={"http://"+item.website}>{item.website}</a></li>
                        </ul>
                    </li>)}
            </ul>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(GroupList);
