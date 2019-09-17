import {gql} from "apollo-boost";
import React, {useState} from "react";
import {Dropdown, DropdownProps, Image, List, Menu, Search} from "semantic-ui-react";
import {useQuery} from "@apollo/react-hooks";
import {GroupExtended, groupExtended} from "../../../services/apollo/fragments/group";
import {User} from "../../../constants/types";
import {LoadingMessage} from "../../../components/Messages/LoadingMessage";
import GraphQLError from "../../../components/Messages/Errors";
import {RoutesBuilders} from "../../../constants/routes";
import {UserItem} from "./UserItem";

export const GET_MEMBERS = gql`
    query getMembers($gid: ID!) {
        group(gid: $gid) {
            ...groupExtended
        }
    }
    ${groupExtended}
`;

export interface MembersProps {
    gid: string,
    isAdmin: boolean,
}

export enum FILTERS {
    Members = "Members",
    Speakers = "Speakers",
    Admins = "Admins",
    Likers = "Likers",
}

const simpleGroupFilters = [
    {key: 0, value: FILTERS.Admins, text: FILTERS.Admins, disabled: false, icon: "chess queen"},
    {key: 1, value: FILTERS.Speakers, text: FILTERS.Speakers, disabled: false, icon: "bullhorn"},
    {key: 2, value: FILTERS.Members, text: FILTERS.Members, disabled: false, icon: "heart"},
    {key: 3, value: FILTERS.Likers, text: FILTERS.Likers, disabled: false, icon: "eye"},
];

const metaGroupFilters = [
    {key: 0, value: FILTERS.Admins, text: "Admins", disabled: false, icon: "chess queen"},
    {key: 1, value: FILTERS.Speakers, text: "Speakers", disabled: true, icon: "bullhorn"},
];

function Members(props: MembersProps) {
    const {gid, isAdmin} = props;
    const {error, loading, data} = useQuery<{ group: GroupExtended }, { gid: string }>(GET_MEMBERS, {
        variables: {gid},
        errorPolicy: "all",
    });
    const [filter, setFilter] = useState<FILTERS>(FILTERS.Admins);

    if (!data)
        return <>
            {loading && <LoadingMessage/>}
            {error && <GraphQLError error={error}/>}
        </>;

    const group = data.group;
    let users: Array<User> = [];
    switch (group.__typename) {
        case "MetaGroup":
            if (filter === FILTERS.Admins)
                users = group.admins;
            break;

        case "SimpleGroup":
            switch (filter) {
                case FILTERS.Admins:
                    users = group.admins;
                    break;
                case FILTERS.Members:
                    users = group.members;
                    break;
                case FILTERS.Likers:
                    users = group.likers;
                    break;
                case FILTERS.Speakers:
                    users = group.speakers;
                    break;
            }
    }

    // @ts-ignore
    const changeDropdown = (_: any, {value}: DropdownProps) => setFilter(FILTERS[value]);

    return <>
        <Menu secondary>
            <Menu.Item>
                <Dropdown
                    options={group.__typename === "MetaGroup" ? metaGroupFilters : simpleGroupFilters}
                    onChange={changeDropdown}
                    selection
                    defaultValue={filter}
                />
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Search placeholders={"Search in " + filter + " ... "}/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        <List>
            {(group.__typename === "MetaGroup" && filter === FILTERS.Members)
                ? group.members.map(g => (
                    <List.Item key={g.gid} as="a" href={RoutesBuilders.Group(gid)}>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'/>
                        <List.Content content={g.name}/>
                    </List.Item>
                ))
                : users.filter(user => !!user).map(user =>
                    <List.Item key={user.uid}>
                        <UserItem user={user} filter={filter} isAdmin={isAdmin} gid={gid}/>
                    </List.Item>
                )
            }
        </List>
    </>;
}

export default Members;
