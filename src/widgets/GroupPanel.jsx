/**
 * @file resume des groupes de l'utilisateur a inserer dans le SideBar
 * 
 */

import React from 'react';
import { Button, Component} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import GraphQLError from "../errors/GraphQLError.jsx";
import PropTypes from 'prop-types';

/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
const GET_ALLGROUPS = gql`
    query GroupQuery {
        allGroups {
            gid
            name
        }
    }
`;

class GroupPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const { groupQuery: { loading, error, allGroups } } = this.props;

        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <li><GraphQLError error={error}/></li>;
        }

        console.log(JSON.stringify(allGroups));

        return (
            <div>
                {allGroups.map(gr => {
                    const linkto = "/groups/"+gr.uid;
                    return <div key={gr.uid}>
                        <Link to={linkto}><Button>{gr.name}</Button></Link>
                    </div>;
                }
                )}
            </div>
        );}
}

GroupPanel.propTypes = {
    groupQuery: PropTypes.shape({ 
        loading: PropTypes.any.isRequired,
        error: PropTypes.any.isRequired,
        allGroups: PropTypes.arrayOf(
            PropTypes.shape({
                uid: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default graphql(GET_ALLGROUPS,{name:"groupQuery"})(GroupPanel);