import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Feed, Header, Image, Item, List, Menu, Message, Segment} from 'semantic-ui-react';
import {GQLError} from "../Errors.jsx";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {Author, AuthorList} from "../utils/author.jsx";
import ButtonParticipate from "./ButtonParticipate.jsx";

/**
 * @constant Requête pour obtenir tous les posts.
 */
const ALL_POSTS = gql`
    query getEvent ($mid: ID!) {
        event(mid: $mid) {
            mid
            title
            content
            location
            startTime
            endTime
            authors {
                gid
                name
            }
            recipients {
                gid
                name
            }
            createdAt
            updatedAt
            participatingGroups {
                gid
                name
                description
            }
            participatingUsers {
                uid
                givenName
                lastName
            }
            forAnnouncement {
                mid
                title
                content
            }
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class EventPage extends React.Component {
    state = {
        displayUsers: "users",
        feed: false,
    };

    render() {

        const mid = this.props.match.params.mid;
        return (

            <Query query={ALL_POSTS}
                   variables={{mid: mid}}
                   fetchPolicy={'catch-first'}
            >
                {({loading, error, data, refetch}) => {
                    if (loading) return <Feed>Chargement...</Feed>;
                    else if (error) {
                        return <GQLError error={error}/>;
                    }
                    const {event} = data;
                    let participants = [];
                    if (this.state.displayUsers === "users")
                        participants = event.participatingUsers;
                    else if (this.state.displayUsers === "groups")
                        participants = event.participatingGroups;
                    else
                        participants = event.participatingUsers.concat(event.participatingGroups);

                    return (
                        <div>
                            <Segment vertical>
                                <Header>
                                    {event.title}
                                    <ButtonParticipate
                                        participatingUid={event.participatingUsers.map(u => u.uid)}
                                        onChange={() => refetch()}
                                        mid={mid}
                                    />
                                </Header>
                                <List>
                                    <List.Item>
                                        <List.Icon name="calendar"/>
                                        <List.Content>
                                            From <Moment date={event.startTime} withTitle fromNow/> to <Moment withTitle
                                                                                                               fromNow
                                                                                                               date={event.endTime}/>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item icon="map marker" content={event.location}/>
                                    <List.Item>
                                        <List.Icon name="group"/>
                                        <List.Content>
                                            Par <AuthorList elements={event.authors}/> pour <AuthorList
                                            elements={event.recipients}/>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                            <Segment vertical>
                                <ReactMarkdown>{event.content}</ReactMarkdown>
                            </Segment>
                            {this.state.feed ?
                                <Segment vertical>
                                    <Menu secondary pointing>
                                        <Menu.Item>
                                            <Header as="h3">
                                                Feed
                                            </Header>
                                        </Menu.Item>
                                        <Menu.Item
                                            content="Participants"
                                            onClick={() => this.setState({feed: false})}
                                        />
                                    </Menu>
                                    <Item.Group>
                                        {event.forAnnouncement &&
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>
                                                    {event.forAnnouncement.title}
                                                </Item.Header>
                                                <Item.Description>
                                                    {event.forAnnouncement.content}
                                                </Item.Description>
                                                <Item.Extra>
                                                    Created <Moment fromNow withTitle
                                                                    date={event.forAnnouncement.createdAt}/>
                                                </Item.Extra>
                                            </Item.Content>
                                        </Item>
                                        }
                                    </Item.Group>
                                    <Message warning>
                                        Commentaires et Réponses pas encore implémentées
                                    </Message>
                                </Segment>
                                :
                                <Segment vertical>
                                    <Menu secondary pointing>
                                        <Menu.Item>
                                            <Header as="h3">
                                                Participants
                                            </Header>
                                        </Menu.Item>
                                        <Menu.Item
                                            content="Feed"
                                            onClick={() => this.setState({feed: true})}
                                        />
                                        <Menu.Menu position="right">
                                            <Menu.Item
                                                content="Users"
                                                active={this.state.displayUsers === "users"}
                                                onClick={() => this.setState({displayUsers: "users"})}
                                            />
                                            <Menu.Item
                                                content="Groups"
                                                active={this.state.displayUsers === "groups"}
                                                onClick={() => this.setState({displayUsers: "groups"})}
                                            />
                                            <Menu.Item
                                                content="Both"
                                                active={this.state.displayUsers === "both"}
                                                onClick={() => this.setState({displayUsers: "both"})}
                                            />
                                        </Menu.Menu>
                                    </Menu>
                                    < List>
                                        {participants.map(p =>
                                            <List.Item key={p.uid || p.gid}>
                                                <Image avatar
                                                       src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                                                <List.Content>
                                                    <List.Header><Author {...p}/></List.Header>
                                                    {p.description &&
                                                    <ReactMarkdown>{p.description}</ReactMarkdown>
                                                    }
                                                </List.Content>
                                            </List.Item>
                                        )}
                                    </List>
                                </Segment>
                            }

                        </div>
                    );

                }}
            </Query>
        )
            ;
    }
}

export default EventPage;
