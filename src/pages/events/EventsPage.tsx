import React from "react";
import {Container, Feed, Header, Message, Segment} from "semantic-ui-react";
import {gql} from "apollo-boost";
import {EventExtended, eventExtended} from "../../services/apollo/fragments/event";
import {useQuery} from "@apollo/react-hooks";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import EventFeedItem from "../../components/Events/EventFeedItem";

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
            <EventFeedItem e={e}/>
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
