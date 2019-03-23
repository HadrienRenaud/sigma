import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {GQLError} from "../Errors.jsx";
/**
 * @file Composant pour afficher les informations sur un groupe.
 * L'idee est d'avoir un preview du groupe, a inserer en header de chaque announcement par ex.
 * Mieux : afficher ce Component au-dessus de la souris en hover.
 * Ca correspond a la notion de 'card' comme pour UserCard et AnnouncementCard.
 * @author manifold
 */

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            gid
            name
            website
            description
        }
    }
`;

class GroupCard extends React.Component {

    static propTypes = {
        gid: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_GROUP}
                variables={{gid: this.props.gid}}
                fetchPolicy='cache-first' //choose cache behaviour
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Chargement...</div>;
                    else if (error) return <GQLError error={error}/>;

                    const { group } = data; //extracts the actual data from object 'data'

                    return (
                        <Card fluid={true} color={"blue"}>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={"/groups/" + this.props.gid}>{group.name}</Link>
                                </Card.Header>
                                <Card.Meta>
                                    <a href={group.website}>{group.website}</a>
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    {group.description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    );
                }}
            </Query>
        );
    }
}

export default GroupCard;
