import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link} from 'semantic-ui-react';
import Post from '../body/messages/Post.jsx';

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_EVENTS = gql`
    query eventsQuery {
        allEvents {
            id
            title
            content
            authors {
                uid
                name
            }
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class EventsPanel extends React.Component {

    render() {

        return (
            <Query query={ALL_EVENTS}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <div>Chargement...</div>;
                    else if (error) {
                        console.log(JSON.stringify(error));
                    }
                    const {allEvents} = data;
                    return (
                        <div>
                            {allEvents.map(post => (
                                <Post key={post.id} {...post}/>
                            ))}
                        </div>
                    );

                }}
            </Query>
        );
    }
}

export default EventsPanel;