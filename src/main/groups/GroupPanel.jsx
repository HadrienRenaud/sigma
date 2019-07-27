/**
 * @file resume des groupes de l'utilisateur a inserer dans le MySideBar
 *
 */

import React from 'react';
import {Accordion, Button, Segment, Icon, Component, Sticky, Container, Card} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {GQLError} from "../utils/Errors.jsx";

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
        const {groupQuery: {loading, error, allGroups}} = this.props;

        if (loading) {
            return <li>Loading...</li>;
        } else if (error) {
            return <GQLError error={error}/>;
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        Mes groupes
                    </Card.Header>
                </Card.Content>
                <Button.Group basic vertical>
                    {allGroups.map(gr =>
                        <Button as={Link} to={"/group/" + gr.gid} content={gr.name} key={gr.gid}/>
                    )}
                </Button.Group>
            </Card>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: "groupQuery"})(GroupPanel);
