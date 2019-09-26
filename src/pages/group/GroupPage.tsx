import React, {useContext, useState} from "react";
import {Container, Menu} from "semantic-ui-react";
import Main from "./components/Main";
import UserContext from "../../components/UserContext/context";
import FrontPage from "./components/FrontPage";
import {gql} from "apollo-boost";
import {groupBase} from "../../services/apollo/fragments/group";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {Group} from "../../constants/types";
import GraphQLError from "../../components/Messages/Errors";
import MembersPage, {GET_MEMBERS} from "./components/MembersPage";
import AdminPage from "./components/AdminPage";

export interface GroupPageProps {
    match: {
        params: {
            group: string
        }
    }
}

enum Tabs {
    FRONT_PAGE,
    MEMBERS,
    ADMIN,
}

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            ...groupBase
        }
    }
    ${groupBase}
`;

function GroupPage(props: GroupPageProps) {
    const match = props.match;
    const gid = match.params.group || "";
    const [getMembers] = useLazyQuery<{}, { gid: string }>(GET_MEMBERS);
    const {data, error, loading} = useQuery<{ group: Group }, { gid: string }>(
        GET_GROUP,
        {
            variables: {gid},
            onCompleted: () => getMembers({variables: {gid}})
        }
    );
    const group = gid && data && data.group;
    const {user} = useContext(UserContext);

    let isAdmin = false;
    let isSpeaker = false;

    if (gid && user) {
        isSpeaker = user.speakerOf.map(gr => gr.gid).indexOf(gid) !== -1;
        isAdmin = user.adminOf.map(gr => gr.gid).indexOf(gid) !== -1;
    }

    const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.FRONT_PAGE);

    return (
        <Container>
            {error && <GraphQLError error={error}/>}
            {loading && <GraphQLError error={error}/>}
            {group && (
                <Main group={group}/>
            )}
            <Menu pointing secondary color="purple">
                <Menu.Item
                    active={selectedTab === Tabs.FRONT_PAGE}
                    onClick={() => setSelectedTab(Tabs.FRONT_PAGE)}
                    content="Page d'accueil"/>
                <Menu.Item
                    active={selectedTab === Tabs.MEMBERS}
                    onClick={() => setSelectedTab(Tabs.MEMBERS)}
                    content="Membres"/>
                {isAdmin && (
                    <Menu.Item
                        active={selectedTab === Tabs.ADMIN}
                        onClick={() => setSelectedTab(Tabs.ADMIN)}
                        content="Admin"
                    />
                )}
            </Menu>

            {selectedTab === Tabs.MEMBERS && (
                <MembersPage gid={gid} isAdmin={isAdmin}/>
            )}
            {group && selectedTab === Tabs.FRONT_PAGE && (
                <FrontPage frontPage={group.frontPage || ""} isSpeaker={isSpeaker} gid={group.gid}/>
            )}
            {isAdmin && group && selectedTab === Tabs.ADMIN && (
                <AdminPage group={group}/>
            )}
        </Container>
    );
}

export default GroupPage;
