import React, {useState} from "react";
import {Accordion, Icon, Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Group} from "../../../constants/types";
import {RoutesBuilders} from "../../../constants/routes";

interface GroupItemProps {
    group: Group,
}

function GroupListItem({group}: GroupItemProps) {
    return <List.Item key={group.gid}>
        <Image
            avatar
            src={group.logo}
        />
        <List.Content>
            <List.Header as={Link} to={RoutesBuilders.Group(group.gid)}>
                {group.name}
            </List.Header>
            <List.Description>
                {group.description}
            </List.Description>
            <List.List>
                {group.parents && group.parents.map(g =>
                    <GroupListItem group={g} key={g.gid}/>
                )}
            </List.List>
        </List.Content>
    </List.Item>;
}

function GroupItemAccordion({group}: GroupItemProps) {
    const [isActive, setActive] = useState<boolean>(false);

    return <Accordion>
        <Accordion.Title
            active={isActive}
            onClick={() => setActive(!isActive)}
        >
            <Icon name="dropdown"/>
            Expand
        </Accordion.Title>
        <Accordion.Content active={isActive}>
            <List.List>
                {group.parents && group.parents.map(g =>
                    <GroupListItem group={g} key={g.gid}/>
                )}
            </List.List>
        </Accordion.Content>
    </Accordion>;
}

interface UserMembershipsProps {
    displayedGroups: Array<Group>,
    expanded: boolean,
}

export function UserMemberships(props: UserMembershipsProps) {
    const {displayedGroups, expanded} = props;

    return <List relaxed>
        {displayedGroups.map(gr =>
            <List.Item key={gr.gid}>
                <Image
                    avatar
                    src={gr.logo}
                />
                <List.Content>
                    <List.Header as={Link} to={RoutesBuilders.Group(gr.gid)}>
                        {gr.name}
                    </List.Header>
                    <List.Description>
                        {gr.description}
                    </List.Description>
                    {expanded && gr.parents && (
                        <GroupItemAccordion
                            group={gr}
                        />
                    )}
                </List.Content>
            </List.Item>
        )}
    </List>;
}

