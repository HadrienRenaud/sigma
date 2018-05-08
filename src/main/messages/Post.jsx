import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Segment, Label, Link, Button } from 'semantic-ui-react';
import GroupCard from '../groups/GroupCard.jsx';

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        location: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    eventLocation() {
        if (this.props.hasOwnProperty("location") && this.props.location !=null) {
            return <div>
                <Icon name='map' color="blue" />
                {this.props.location}
            </div>;
        }
    }

    render() {

        return (
            <Segment>
                <Header as="h2">
                    {this.props.title}
                </Header>
                {this.props.authors.map(auth => <span key={auth.uid}>{auth.name} </span>)}
                {this.eventLocation()}
                <p>
                    {this.props.content}
                </p>
            </Segment>
        );
    }
}

export default Post;