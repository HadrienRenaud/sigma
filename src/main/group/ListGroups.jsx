import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
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

        if (this.props.groupQuery && this.props.groupQuery.loading) {
            return <div>Loading...</div>;
        }

        if (this.props.groupQuery && this.props.groupQuery.error) {
            return <div>Error</div>;
        }

        return (
            <div>
                <span>{JSON.stringify(this.props.groupQuery.allGroups,null,2)}</span>
                <ul>
                    {this.props.allGroups}
                </ul>
            </div>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(GroupList);
