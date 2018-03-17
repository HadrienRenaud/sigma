import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

/**
 * Composant pour afficher les informations sur un groupe.
 * @author manifold
 */
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

        if (!this.state.website.startsWith("http://")) {
            this.state.website = "http://"+this.state.website;
        }
    }

    render() {
        const grouplinkto = "/group/"+this.props.uid;
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