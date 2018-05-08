import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Feed, Header } from 'semantic-ui-react';
import Post from './Post.jsx';

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query eventsQuery {
        allMessages {
            id
            title
            content
            authors {
                uid
                name
            }
            ...on Event {
                location
            }
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class PostsFeed extends React.Component {

    render() {

        return (
            <Query query={ALL_POSTS}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <Feed>Chargement...</Feed>;
                    else if (error) {
                        console.log(JSON.stringify(error));
                    }
                    const {allMessages} = data;
                    return (
                        <Feed>
                            {allMessages.map(post => (
                                <Post key={post.id} {...post}/>
                            ))}
                        </Feed>
                    );

                }}
            </Query>
        );
    }
}

export default PostsFeed;