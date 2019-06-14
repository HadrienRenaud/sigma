import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Button, Feed, Modal, Icon, Image, Item, List, Menu, Message, Segment} from 'semantic-ui-react';
import Post from './Post.jsx';
import {GQLError} from "../Errors.jsx";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {AuthorList, Author} from "../utils/author.jsx";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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
        }
    }
`;

/**
 * @class Liste des publications effectuées.
 * @author manifold
 * @extends React.Component
 */
class EventResume extends React.Component {
    handleParticipate() {
        console.log("Envoyer une requête pour participer");
    }

    static propTypes = {
        mid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    };

    render() {

        let jeParticipeALEvenement = true;

        return (

            <Query query={ALL_POSTS}
                   variables={{mid: this.props.mid}}
                   fetchPolicy='cache-first'
            >
                {({loading, error, data}) => {
                    if (loading) return <Feed>Chargement...</Feed>;
                    else if (error) {
                        return <GQLError error={error}/>;
                    }
                    const {event} = data;

                    return (
                        <Modal {...this.props}>
                            <Modal.Header>
                                {event.title}

                            </Modal.Header>

                            <Modal.Content image>
                                <Image wrapped size="medium" src={"https://react.semantic-ui.com/images/avatar/large/rachel.png"}/>
                                <Modal.Description>
                                    <List>
                                        <List.Item>
                                            <List.Icon name="calendar"/>
                                            <List.Content>
                                                From <Moment date={event.startTime} withTitle fromNow/> to <Moment
                                                withTitle
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
                                    <ReactMarkdown>{event.content}</ReactMarkdown>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    as={Link} to={'/event/' + this.props.mid}
                                    content="See more"
                                    color="grey"
                                    labelPosition='left'
                                    icon="external"
                                />
                                <Button
                                    content={jeParticipeALEvenement ? "Participer" : "Ne pas participer"}
                                    color={jeParticipeALEvenement ? "green" : "orange"}
                                    onClick={this.handleParticipate.bind(this)}
                                    icon={jeParticipeALEvenement ? "add to calendar" : "delete calendar"}
                                    labelPosition='left'
                                />
                            </Modal.Actions>
                        </Modal>
                    );

                }}
            </Query>
        )
            ;
    }
}

export default EventResume;
