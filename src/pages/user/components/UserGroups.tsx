import React, {useState} from "react";
import UserGroupsMenu, {Tabs} from "./UserGroupsMenu";
import {UserMemberships} from "./UserMemberships";
import {Group, User} from "../../../constants/types";

export interface UserGroupsProps {
    isMe: boolean,
    user: User,
}

interface DisplayUserGroupsProps {
    mapTabToGids: Map<Tabs, Array<string>>,
    mapGidToGroups: Map<string, Group>,
    isMe: boolean,
}

type InheritanceProperty = "parents" | "children"

function constructGraph(groups: Array<Group>, asked: InheritanceProperty = "parents") {
    const gidToGroup = new Map<string, Group>();

    for (let gr of groups) {
        gidToGroup.set(gr.gid, gr);
    }

    for (let i = 0; i < groups.length; i++) {
        const children = groups[i][asked];
        if (children)
            for (let j = 0; j < children.length; j++) {
                const child = gidToGroup.get(children[j].gid);
                children[j] = {
                    ...children[j],
                    ...child
                };
            }
    }

    return gidToGroup;
}

function filterUndefined<T>(array: Array<T | undefined>): Array<T>{
    // @ts-ignore
    return array.filter(elt => !!elt)
}

function DisplayUserGroups(props: DisplayUserGroupsProps) {
    const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Admin);

    const displayedGids = props.mapTabToGids.get(selectedTab);
    const displayedGroups = displayedGids
        ? displayedGids.map(gid => props.mapGidToGroups.get(gid))
        : [];

    return (
        <>
            <UserGroupsMenu isMe={props.isMe} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <UserMemberships
                displayedGroups={filterUndefined(displayedGroups)}
                expanded={selectedTab === Tabs.Member}
            />
        </>
    );
}

function UserGroups(props: UserGroupsProps) {
    const {isMe, user} = props;

    const mapTabToGids = new Map<Tabs, Array<string>>([
        [Tabs.Dislikes, []],
        [Tabs.Likes, user.likes.map(gr => gr.gid)],
        [Tabs.Member, user.memberOf.map(gr => gr.gid)],
        [Tabs.Speaker, user.speakerOf.map(gr => gr.gid)],
        [Tabs.Admin, user.adminOf.map(gr => gr.gid)],
    ]);

    const allGroups = [
        ...user.likes,
        ...user.inheritedMemberOf,
        ...user.inheritedAdminOf,
    ];

    return <DisplayUserGroups isMe={isMe} mapGidToGroups={constructGraph(allGroups)} mapTabToGids={mapTabToGids}/>
}

export default UserGroups;
