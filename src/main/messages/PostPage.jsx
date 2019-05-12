import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Button, Feed, Grid, Header, Icon, Image, Item, List, Menu, Message, Segment} from 'semantic-ui-react';
import Post from './Post.jsx';
import {GQLError} from "../Errors.jsx";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {AuthorList, Author} from "../utils/author.jsx";
import {Link} from "react-router-dom";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query getAnnouncement($mid: ID!) {
        announcement(mid: $mid) {
            mid
            createdAt
            updatedAt
            title
            content
            authors {
                gid
                name
            }
            recipients {
                gid
                name
            }
            forEvent {
                mid
                title
            }
        }
    }
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

        let jeParticipeALEvenement = true;

        return (

            <Query query={ALL_POSTS}
                   variables={{mid: this.props.match.params.mid}}
                   fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <Feed>Chargement...</Feed>;
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
                                            Par <AuthorList elements={a.authors}/> pour <AuthorList
                                            elements={a.recipients}/>
                                        </List.Content>
                                    </List.Item>
                                    {a.forEvent ?
                                        <List.Item>
                                            <List.Icon name="calendar"/>

                                            <List.Content>
                                                For event <Link to={"/event/" + a.forEvent.mid}>{a.forEvent.title}</Link>
                                            </List.Content>
                                        </List.Item>
                                        : ""
                                    }

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
        )
            ;
    }
}

export default PostPage;