/**
 * @file Component carte presentant toutes les informations sur un Announcement
 * @author kadabra
 *
 * /!\
 * Ce Component se base sur la version du schema graphQL proposee par moi (kadabra)
 * et qui n'est pas (au moment ou j'ecris) completement implementee dans le back.
 * Donc ne marchera pas tant que le back n'est pas modifie.
 * /!\
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Card, Feed, Image} from 'semantic-ui-react';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {GQLError} from "../Errors.jsx";
import {Link} from "react-router-dom";

/**
 * @constant Requête GraphQL
 */
const GET_ANNOUNCEMENT = gql`
    query getAnnouncement($mid: ID!) {
        announcement(mid: $mid) {
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

            importance # TODO: mettre un commentaire pour expliquer
            views # TODO mettre un commentaire pour expliquer

            forEvent {
                mid,
                title,
                startTime
            }
        }
    }
`;

class DummyAnnouncementCard extends React.Component {
    /**
     * placeholder pour ne pas tout casser, jusqu'a ce que le back soit modifie
     */

    render() {
        return (
            <p>Hi, I'm a DummyAnnouncementCard Component. The real thing is not ready yet.</p>
        );
    }
}


class AnnouncementCard extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        mid: PropTypes.string.isRequired
    };

    render() {

        return (
            <Query query={GET_ANNOUNCEMENT}
                   variables={{
                       mid: this.props.mid
                   }}
                   fetchPolicy='cache-first' //choose cache behaviour
            >
                {({loading, error, data}) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <GQLError error={error}/>;

                    const {announcement} = data; //extracts the actual data from object 'data'

                    return (
                        <Feed.Event key={this.props.mid}>
                            <Feed.Label>
                                <Image src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date>
                                    {"Par "}
                                    {announcement.authors.map(group => <span key={group.gid}>
                                                <Link to={'/groups/' + group.gid}>
                                                    {group.name}
                                                    </Link>
                                        {", "}
                                            </span>)}
                                    {"à "}
                                    {announcement.recipients.map(group => <span key={group.gid}>
                                                <Link to={'/groups/' + group.gid}>
                                                    {group.name}
                                                    </Link>
                                        {", "}
                                            </span>)}
                                </Feed.Date>
                                <Feed.Summary>
                                    {announcement.title}
                                </Feed.Summary>
                                <Feed.Extra>
                                    {announcement.content}
                                </Feed.Extra>
                                <Feed.Extra>
                                    buttons, maybe
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                    );
                }}
            </Query>
        );
    }
}

export default AnnouncementCard;
