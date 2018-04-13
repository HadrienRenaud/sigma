import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Label, Link, Button } from 'semantic-ui-react';
import GroupCard from '../group/GroupPreview.jsx';

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
            authors: PropTypes.arrayOf(PropTypes.object).isRequired
        }).isRequired
    }

    render() {

        return (
            <Segment>
                <Header>
                    {this.props.data.title}
                </Header>
                <p>
                    {this.props.data.content}
                </p>
                {this.props.data.authors.map(gr => 
                    <GroupCard key={gr.uid} uid={gr.uid} name={gr.name} website={gr.website}/>
                )}
            </Segment>
        );
    }
}

export default Post;