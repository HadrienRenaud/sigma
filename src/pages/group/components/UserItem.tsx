import {gql} from "apollo-boost";
import {groupExtended} from "../../../services/apollo/fragments/group";
import {User} from "../../../constants/types";
import {Button, ButtonProps, Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RoutesBuilders} from "../../../constants/routes";
import React from "react";
import {FILTERS} from "./MembersPage";
import {useMutation} from "@apollo/react-hooks";

interface ActionButtonProps extends ButtonProps {
    query: any,
    uid: string,
    gid: string,
}

function ActionButton(props: ActionButtonProps) {
    const {uid, gid, query} = props;
    const [remove, {loading}] = useMutation<{}, { forGroup: string, uid: string }>(query, {
            variables: {forGroup: gid, uid}
        }
    );

    return (
        <Button
            {...props}
            labelPosition='left'
            onClick={() => remove()}
            loading={loading}
        />
    );
}

const REMOVE_FROM_ADMIN = gql`
    mutation removeFromAdmins($forGroup: ID!, $uid: ID!) {
        unmakeAdmin(forGroup: $forGroup, uid: $uid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;
const REMOVE_FROM_SPEAKERS = gql`
    mutation removeFromSpeakers($forGroup: ID!, $uid: ID!) {
        unmakeSpeaker(forGroup: $forGroup, uid: $uid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;
const REMOVE_FROM_MEMBER = gql`
    mutation removeFromMembers($forGroup: ID!, $uid: ID!) {
        removeMember(fromGroup: $forGroup, uid: $uid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;
const ADD_TO_SPEAKERS = gql`
    mutation addToSpeakers($forGroup: ID!, $uid: ID!) {
        makeSpeaker(forGroup: $forGroup, uid: $uid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;
const ADD_TO_ADMINS = gql`
    mutation addToAdmins($forGroup: ID!, $uid: ID!) {
        makeAdmin(forGroup: $forGroup, uid: $uid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;

interface UserItemProps {
    user: User,
    filter: FILTERS,
    isAdmin: boolean,
    gid: string,
}

export function UserItem(props: UserItemProps) {
    const {filter, gid, user, isAdmin} = props;

    let removeQuery;
    switch (filter) {
        case FILTERS.Admins:
            removeQuery = REMOVE_FROM_ADMIN;
            break;
        case FILTERS.Speakers:
            removeQuery = REMOVE_FROM_SPEAKERS;
            break;
        case FILTERS.Members:
            removeQuery = REMOVE_FROM_MEMBER;
            break;
    }

    return <>
        <Image
            avatar
            src={props.user.photo || "https://react.semantic-ui.com/images/avatar/small/rachel.png"}
        />
        <List.Content as={Link} to={RoutesBuilders.User(props.user.uid)}>
            <List.Header>
                {props.user.givenName} {props.user.lastName}
            </List.Header>
            <List.Description>
                @{props.user.uid}
            </List.Description>
        </List.Content>
        {isAdmin && filter !== FILTERS.Likers && (
            <List.Content floated="right">
                <Button.Group>
                    {(filter === FILTERS.Members) && (
                        <ActionButton
                            query={ADD_TO_SPEAKERS}
                            uid={user.uid}
                            gid={gid}
                            content="Make speaker"
                            color="yellow"
                            icon="bullhorn"
                        />
                    )}
                    {filter !== FILTERS.Admins && (
                        <ActionButton
                            query={ADD_TO_ADMINS}
                            uid={user.uid}
                            gid={gid}
                            content="Make admin"
                            color="orange"
                            icon="star"
                        />
                    )}
                    <ActionButton
                        color="red"
                        icon="remove"
                        uid={user.uid}
                        gid={gid}
                        content={`Remove from ${filter}`}
                        query={removeQuery}
                    />
                </Button.Group>
            </List.Content>
        )}
    </>;
}
