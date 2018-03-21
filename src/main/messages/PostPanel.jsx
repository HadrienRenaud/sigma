import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Label, Link, Button, Segment } from 'semantic-ui-react';
import Post from './Post.jsx';

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query PostQuery {
        allPosts {
            id
            title
            content
            authors {
                uid
                name
                website
            }
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class PostPanel extends React.Component {

    render() {
        const { postQuery: { loading, error, accessPosts }} = this.props;

        if (loading) {
            return <div>Loading, please wait...</div>;
        } else if (error) {
            return <div>Error {error}</div>;
        }

        return (
            <Segment.Group>
                {accessPosts.allPosts.map(item =>
                    <Post key={item.id} data={item} />
                )}
            </Segment.Group>
        );
    }
}

export default graphql(ALL_POSTS, {name: 'postQuery'})(PostPanel);