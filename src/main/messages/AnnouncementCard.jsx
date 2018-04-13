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
import { Route, Link } from 'react-router-dom';
import { Button, Segment, Icon, Divider, Card } from 'semantic-ui-react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/**
 * @constant Requête GraphQL
*/
const GET_ANNOUNCEMENT = gql`
    query getAnnouncement($id: ID!) {
        announcement {
            createdAt
            updatedAt
            title
            content

            authors
            recipients

            importance # TODO: mettre un commentaire pour expliquer
            views # TODO mettre un commentaire pour expliquer
    
            forEvent {
                id,
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

    render(){
        return(
            <p>Hi, I'm a DummyAnnouncementCard Component. The real thing is not ready yet.</p>
        );
    }
}


class AnnouncementCard extends React.Component {
    constructor(props) {
        super(props);
    }

    static PropTypes = {
        id: PropTypes.string.isRequired
    }

    render() {

        return (
            <Query query={GET_ANNOUNCEMENT}
                variables={{
                    id: this.props.id
                }}
                fetchPolicy='cache-first' //choose cache behaviour
            >
                {({ loading, error, data }) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <div>Erreur de chargement graphQL.</div>;

                    const { announcement } = data; //extracts the actual data from object 'data'

                    return (
                        <div>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        Titre de l'annonce:
                                        {announcement.title}
                                    </Card.Header>
                                    <Card.Meta>
                                        sous-titre
                                    </Card.Meta>
                                    <Card.Description>
                                        <p>Hi from AnnouncementCard.jsx. Content:</p>
                                        {announcement.content}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    buttons, maybe
                                </Card.Content>
                            </Card>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default DummyAnnouncementCard;
