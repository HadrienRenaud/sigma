import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {EventExtended, eventExtended} from "../../services/apollo/fragments/event";
import {LoadingMessage} from "../../components/Messages/LoadingMessage";
import GraphQLError from "../../components/Messages/Errors";
import {Container, Header, Image, List, Message, Segment} from "semantic-ui-react";
import {Link, useParams} from "react-router-dom";
import {RoutesBuilders} from "../../constants/routes";
import ReactMarkdown from "react-markdown";
import ParticipateButton from "./components/ParticipateButton";

const GET_EVENT = gql`
    query event($eid: ID!) {
        event(eid: $eid) {
            ...eventExtended
        }
    }
    ${eventExtended}
`;


function EventPage() {
    const {eid} = useParams();
    const {data, loading, error, refetch} = useQuery<{ event: EventExtended }, { eid: string }>(GET_EVENT, {variables: {eid}});

    if (loading)
        return <LoadingMessage/>;

    if (!data || !data.event || error)
        return <GraphQLError error={error}/>;

    const e: EventExtended = data.event;

    return (
        <Container>
            <Segment vertical>
                <ParticipateButton eid={eid} participatingUsers={e.participatingUsers || []} refresh={refetch}/>
                <Header as="h1">{e.title}</Header>
            </Segment>
            <Segment vertical>
                <ReactMarkdown source={e.content}/>
            </Segment>
            <Segment vertical>
                <List relaxed>
                    {e.authors && (
                        <List.Item>
                            <List.Icon name="write"/>
                            <List.Content>
                                Par{' '}
                                {e.authors.map(g => <>
                                    <Link to={RoutesBuilders.Group(g.gid)}>{g.name}</Link>
                                    , </>
                                )}
                            </List.Content>
                        </List.Item>
                    )}
                    {e.recipients && (
                        <List.Item>
                            <List.Icon name="hand point right outline"/>
                            <List.Content>
                                Pour{' '}
                                {e.recipients.map(g => <>
                                    <Link to={RoutesBuilders.Group(g.gid)}>{g.name}</Link>
                                    , </>
                                )}
                            </List.Content>
                        </List.Item>
                    )}
                    <List.Item content={`Commence le ${e.startTime}`} icon="clock outline"/>
                    <List.Item content={`Fini le ${e.endTime}`} icon="flag checkered"/>
                    <List.Item content={e.location} icon="map marker alternate"/>
                </List>
            </Segment>
            <Segment vertical>
                <Header as="h3" content="Participation"/>
                {e.participatingGroups && <>
                    <Header as="h4" content="Groups"/>
                    {e.participatingGroups.length > 0
                        ? <Segment>
                            <List>
                                {e.participatingGroups.map(g => (
                                    <List.Item
                                        image={() => <Image src={g.logo} avatar/>}
                                        header={g.name}
                                        content={'@' + g.gid}
                                        as={Link}
                                        to={RoutesBuilders.Group(g.gid)}
                                    />
                                ))}
                            </List>
                        </Segment>
                        : <Message
                            header="Aucun groupe ne participe à l'évènement pour l'instant."
                            content="Chauffe tes potes poto !"
                        />
                    }
                </>}
                {e.participatingUsers && <>
                    <Header as="h4" content="Users"/>
                    {e.participatingUsers.length > 0 ? <Segment>
                            <List>
                                {e.participatingUsers.map(u => (
                                    <List.Item
                                        image={() => <Image src={u.photo} avatar/>}
                                        header={`${u.givenName} ${u.lastName}`}
                                        content={'@' + u.uid}
                                        as={Link}
                                        to={RoutesBuilders.User(u.uid)}
                                    />
                                ))}
                            </List>
                        </Segment>
                        : <Message
                            header="Aucun utilisateur ne participe à l'évènement pour l'instant."
                            content="Chauffe toi !"
                        />
                    }
                </>}
            </Segment>
        </Container>
    );
}

export default EventPage;

