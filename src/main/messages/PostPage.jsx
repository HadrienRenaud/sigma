import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Header, List, Message, Segment} from 'semantic-ui-react';
import {GQLError} from "../utils/Errors.jsx";
import ReactMarkdown from "react-markdown";
import {AuthorList} from "../utils/author.jsx";
import {Link} from "react-router-dom";
import {LoadingMessage} from "../utils/Messages.jsx";
import {messageExtended} from "../graphql/fragments/message";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query getAnnouncement($mid: ID!) {
        message(mid: $mid) {
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
class PostPage extends React.Component {
    state = {
        displayUsers: "users",
        feed: false,
    };

    handleParticipate() {
        console.log("Envoyer une requête pour participer");
    }

    render() {

        const jeParticipeALEvenement = true;

        return (

            <Query
                query={ALL_POSTS}
                variables={{mid: this.props.match.params.mid}}
                fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <LoadingMessage/>;
                    else if (error) {
                        return <GQLError error={error}/>;
                    }
                    const a = data.announcement;
                    return (
                        <div>
                            <Segment vertical>
                                <Header>
                                    {a.title}
                                </Header>
                                <List>
                                    <List.Item>
                                        <List.Icon name="group"/>
                                        <List.Content>
                                            Par <AuthorList elements={a.authors}/> pour
                                            <AuthorList elements={a.recipients}/>
                                        </List.Content>
                                    </List.Item>
                                    {a.forEvent && (
                                        <List.Item>
                                            <List.Icon name="calendar"/>

                                            <List.Content>
                                                For event
                                                <Link to={"/event/" + a.forEvent.mid}>{a.forEvent.title}</Link>
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                            <Segment vertical>
                                <ReactMarkdown>{a.content}</ReactMarkdown>
                            </Segment>
                            <Segment vertical>
                                <Message warning>
                                    Commentaires et Réponses pas encore implémentées
                                </Message>
                            </Segment>
                        </div>
                    );

                }}
            </Query>
        );
    }
}

export default PostPage;
