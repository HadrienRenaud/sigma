import React from "react";
import {Container, Feed, Header, Icon, Message, Segment} from "semantic-ui-react";
import {gql} from "apollo-boost";
import {EventExtended, eventExtended} from "../../services/apollo/fragments/event";
import {useQuery} from "@apollo/react-hooks";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import {RoutesBuilders} from "../../constants/routes";
import {Link} from "react-router-dom";

const GET_EVENTS = gql`
    query getEvents {
        allEvents {
            ...eventExtended
        }
    }
    ${eventExtended}
`;


function DisplayEvents() {
    const {data, loading} = useQuery<{ allEvents: [EventExtended] }, {}>(GET_EVENTS);

    if (loading) {
        return <LoadingMessage/>
    }

    if (!data || !data.allEvents) {
        return <Message
            warning
            header="We couldn't find any event"
            content="Please contact support."
        />
    }

    return (<Feed>
        {data.allEvents.map(e => (
            <Feed.Event>
                <Feed.Label>
                    <Icon name="calendar alternate"/>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Date>
                        From {e.startTime} to {e.endTime} à {e.location}
                    </Feed.Date>
                    <Feed.Summary as={Link} to={RoutesBuilders.Event(e.eid)}>
                        {e.title}
                    </Feed.Summary>
                    <Feed.Extra text>
                        {e.content}
                    </Feed.Extra>
                    {e.authors && e.recipients && (
                        <Feed.Meta>
                            Par{' '}
                            {e.authors.map(g => <>
                                <Link to={RoutesBuilders.Group(g.gid)}>{g.name}</Link>
                                , </>
                            )}
                            et pour
                            {e.recipients.map(g => <>
                                <Link to={RoutesBuilders.Group(g.gid)}>{g.name}</Link>,
                            </>)}
                        </Feed.Meta>
                    )}
                </Feed.Content>
            </Feed.Event>
        ))}
    </Feed>);
}

function EventsPage() {
    return (
        <Container>
            <Segment basic>
                <Header as="h1" content="Nexts events"/>
            </Segment>
            <Segment basic>
                <DisplayEvents/>
            </Segment>
        </Container>
    );
}

export default EventsPage;
