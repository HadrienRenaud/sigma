import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Label, Header, Button, Segment, Item, Feed, Card} from 'semantic-ui-react';
import {GQLError} from "../Errors.jsx";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_EVENTS = gql`
    query eventsQuery {
        allEvents {
            mid
            title
            content
            startTime
            endTime
            authors {
                gid
                name
            }
        }
    }
`;


/**
 * @class Définit le composant Author, qui représente un lien vers un auteur d'un post
 * @author hadi
 * @extends React.Component
 */
class Author extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    render() {
        let link = "/";

        if (this.props.auth.uid)
            link = '/user/' + this.props.auth.uid;
        else if (this.props.auth.gid)
            link = '/group/' + this.props.auth.gid;

        return <Link to={link}> {this.props.auth.name}</Link>;
    }
}

/**
 * @class Définit le composant Post, qui représente une publication effectuée par un ou des groupes.
 * @author manifold
 * @author hadi
 * @extends React.Component
 */
class Post extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        location: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.object)
    };

    render() {
        let authors = this.props.authors || [];

        return (
            <Card.Content>
                <Card.Header as={Link} to={"/event/" + this.props.mid}>
                    {this.props.title}
                </Card.Header>
                <Card.Meta>
                    du {this.props.startTime} au {this.props.endTime}
                </Card.Meta>
                <Card.Description>
                    {this.props.content}
                </Card.Description>
                <Card.Meta>
                    {authors.map((auth, i) => {
                        if (i === 0)
                            return <span key={auth.uid || auth.gid}>par: <Author auth={auth}/></span>;
                        else
                            return <span key={auth.uid || auth.gid}> et <Author auth={auth}/></span>;
                    })}
                </Card.Meta>
                {this.props.hasOwnProperty("location") && this.props.location != null &&
                <Label content={this.eventLocation}/>
                }
            </Card.Content>
        );
    }
}


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
                        return <GQLError error={error}/>;
                    }
                    const {allEvents} = data;
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header as={Link} to={"/events"}>Évènements</Card.Header>
                            </Card.Content>
                            {allEvents.map(post => (
                                <Post key={post.mid} {...post}/>
                            ))}
                            <Card.Content>
                                <Button as={Link} to="/event/create">
                                    Créer
                                </Button>
                            </Card.Content>
                        </Card>
                    );

                }}
            </Query>
        );
    }
}

export default EventsPanel;