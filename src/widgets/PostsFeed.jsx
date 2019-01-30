import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Feed} from 'semantic-ui-react';
import Post from '../body/messages/Post.jsx';
import GraphQLError from '../errors/GraphQLError.jsx';

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query POSTS_FEED {
        allMessages {
            mid
            title
            content
            ...on Event {
                location
                authors {
                    gid
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
class PostsFeed extends React.Component {

    render() {

        return (
            <Query query={ALL_POSTS}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <Feed>Chargement...</Feed>;
                    else if (error) return <GraphQLError error={error}/>;
                    else if (Object.keys(data).length > 0) {
                        const {allMessages} = data;
                        return (
                            <p>TODO</p>
                            /*
                            ne pas faire ca, le component Post date d'il y a 11 mois...
                            pas du tout compatible avec changements du schema etc...
                            <Feed>
                                {allMessages.map(post => (
                                    <Post key={post.id} {...post}/>
                                ))}
                            </Feed>
                            */
                        );
                    } else
                        return <GraphQLError error={{message: "Problème dans PostFeed Function."}}/>;
                }}
            </Query>
        );
    }
}

export default PostsFeed;