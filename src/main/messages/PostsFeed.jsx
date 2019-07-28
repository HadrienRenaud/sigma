import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Feed, Header, List} from 'semantic-ui-react';
import Post from './Post.jsx';
import {GQLError} from "../utils/Errors.jsx";
import {LoadingMessage} from "../utils/Messages.jsx";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query eventsQuery {
        allMessages {
            mid
            title
            content
            createdAt
            updatedAt

            ... on Announcement {
                authors {
                    gid
                    name
                }
                recipients {
                    gid
                    name
                }
                views
                forEvent {
                    mid
                    title
                    authors {
                        gid
                        name
                    }
                }
            }

            ... on Event {
                authors {
                    gid
                    name
                }
                recipients {
                    gid
                    name
                }
                participatingGroups {
                    gid
                    name
                }
                participatingUsers {
                    uid
                    givenName
                    lastName
                    photo
                }
                startTime
                endTime
                location
            }

            ... on Question {
                author {
                    uid
                    lastName
                    givenName
                    photo
                }
                recipient {
                    gid
                    name
                }
            }

            ... on PrivatePost {
                author {
                    uid
                    givenName
                    lastName
                    photo
                }
                recipient {
                    gid
                    name
                }
            }

            ... on Answer {
                author {
                    gid
                    name
                }
                forQuestion {
                    mid
                    title
                    content
                    author {
                        uid
                        givenName
                        lastName
                        photo
                    }
                    recipient {
                        gid
                        name
                    }
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
                    const {allMessages} = data;
                    return (
                        <Feed as={List} relaxed divided animated>
                            {allMessages.map(post => (
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
