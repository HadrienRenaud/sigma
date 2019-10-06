import React from "react";
import {Feed, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RoutesBuilders} from "../../constants/routes";
import {EventExtended} from "../../services/apollo/fragments/event";

export interface EventFeedItemProps {
    e: EventExtended
}

function EventFeedItem(props: EventFeedItemProps) {
    const {e} = props;

    return (
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
    );
}

export default EventFeedItem;
