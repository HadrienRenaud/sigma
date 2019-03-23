/**
 * @file resume des groupes de l'utilisateur a inserer dans le SideBar
 * 
 */

import React from 'react';
import { Accordion, Button, Segment, Icon, Component, Sticky, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {GQLError} from "../Errors.jsx";

/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
const GET_ALLGROUPS = gql`
    query GroupQuery {
        allGroups {
            gid
            name
            website
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
            return <GQLError error={error}/>;
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

export default graphql(GET_ALLGROUPS,{name:"groupQuery"})(GroupPanel);