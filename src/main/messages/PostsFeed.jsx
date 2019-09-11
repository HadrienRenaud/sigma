import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Feed, List} from 'semantic-ui-react';
import Post from './Post.jsx';
import {GQLError} from "../utils/Errors.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";
import {messageExtended} from "../graphql/fragments/message";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query eventsQuery {
        allPrivatePosts {
            ...messageExtended
        }
    }
    ${messageExtended}
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class PostsFeed extends React.Component {

    render() {

        return (
            <Query
                query={ALL_POSTS}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <LoadingMessage />;
                    else if (error) {
                        console.log(JSON.stringify(error));
                        return <GQLError error={error}/>;
                    }
                    const {allPrivatePosts} = data;
                    return (
                        <Feed as={List} relaxed divided animated>
                            {allPrivatePosts.map(post => (
                                <Post key={post.mid} {...post}/>
                            ))}
                        </Feed>
                    );

                }}
            </Query>
        );
    }
}

export default PostsFeed;
