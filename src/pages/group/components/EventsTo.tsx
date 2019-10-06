import React from "react";
import {Feed, Header, Message} from "semantic-ui-react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {GroupBase, groupBase} from "../../../services/apollo/fragments/group";
import {EventExtended, eventExtended} from "../../../services/apollo/fragments/event";
import {LoadingMessage} from "../../../components/Messages/LoadingMessage";
import EventFeedItem from "../../../components/Events/EventFeedItem";
import {ROUTES} from "../../../constants/routes";
import {Link} from "react-router-dom";

export interface EventsByProps {
    gid: string
}

const GET_EVENTS = gql`
    query getEventsForGroup ($gid: ID!) {
        group(gid: $gid) {
            ...groupBase
            eventsToGroup {
                ...eventExtended
            }
        }
    }
    ${groupBase}
    ${eventExtended}
`;

interface GetEventsGroupType extends GroupBase {
    eventsToGroup: EventExtended[]
}

function EventsBy(props: EventsByProps) {
    const {gid} = props;
    const {data, loading} = useQuery<{ group: GetEventsGroupType }, { gid: string }>(GET_EVENTS, {variables: {gid}});

    return (
        <>
            <Header as="h3" content="Évènements organisés pour le groupe"/>
            {loading && <LoadingMessage/>}
            {data && data.group && data.group.eventsToGroup && (
                data.group.eventsToGroup.length > 0
                    ? (
                        <Feed>
                            {data.group.eventsToGroup.map(e => (
                                <EventFeedItem e={e}/>
                            ))}
                        </Feed>
                    ) : (
                        <Message
                            info
                            header="Aucun event pour l'instant"
                            content={<Link to={ROUTES.NEW_EVENT}>Crées-en un nouveau</Link>}
                        />
                    )
            )}
        </>
    );
}

export default EventsBy;