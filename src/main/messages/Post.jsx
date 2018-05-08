import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Label, Link, Button } from 'semantic-ui-react';
import GroupCard from '../groups/GroupCard.jsx';

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            location: PropTypes.string,
            authors: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }

    eventLocation() {
        if (this.props.data.hasOwnProperty("location")) {
            return <p>{this.props.data.location}</p>;
        }
    }

    render() {

        return (
            <Segment>
                <Header>
                    {this.props.data.title}
                </Header>
                {this.eventLocation()}
                <p>
                    {this.props.data.content}
                </p>
            </Segment>
        );
    }
}

export default Post;