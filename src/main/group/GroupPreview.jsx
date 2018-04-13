import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
/**
 * @file Composant pour afficher les informations sur un groupe.
 * L'idee est d'avoir un preview du groupe, a inserer en header de chaque announcement par ex.
 * Mieux : afficher ce Component au-dessus de la souris en hover.
 * @author manifold
 */

const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        group(uid: $uid) {
            uid
            name
            website
            description
        }
    }
`;

class GroupCard extends React.Component {

    static PropTypes = {
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired
    }



    constructor(props) {
        super(props);
        this.state = {
            website: this.props.website
        };

        //TODO: ca peut aussi commencer en https !!!
        if (!this.state.website.startsWith("http://")) {
            this.state.website = "http://"+this.state.website;
        }
    }

    render() {
        const grouplinkto = "/groups/"+this.props.uid;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        <Link to={grouplinkto}>{this.props.name}</Link>
                    </Card.Header>
                    <Card.Meta>
                        <a href={this.state.website}>{this.props.website}</a>
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}

export default withRouter(GroupCard);