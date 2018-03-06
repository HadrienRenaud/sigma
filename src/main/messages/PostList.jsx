import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Label } from 'semantic-ui-react';
import Post from './Post.jsx';

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query PostQuery {
        accessPosts {
            allPosts {
                id
                title
                description
                authors {
                    uid
                    name
                }
            }
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class PostList extends React.Component {

    render() {
        const { postQuery: { loading, error, accessPosts }} = this.props;

        if (loading) {
            return <div>Loading, please wait...</div>;
        } else if (error) {
            return <div>Error {error}</div>;
        }

        return (
            <div>
                {accessPosts.allPosts.map(item =>
                    <Post key={item.id} data={item} />
                )}
            </div>
        );
    }
}

export default graphql(ALL_POSTS, {name: 'postQuery'})(PostList);