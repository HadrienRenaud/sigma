import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class GroupCard extends React.Component {

    static PropTypes = {
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
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.name}
                    </Card.Header>
                    <Card.Meta>
                        <a href={this.state.website}>{this.props.website}</a>
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}