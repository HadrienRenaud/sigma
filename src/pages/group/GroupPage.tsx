import React, {useContext} from "react";
import {Container, Menu} from "semantic-ui-react";
import Main from "./components/Main";
import {NavLink, Route, Switch} from "react-router-dom";
import UserContext from "../../components/UserContext/context";
import FrontPage from "./components/FrontPage";
import {gql} from "apollo-boost";
import {groupBase} from "../../services/apollo/fragments/group";
import {useQuery} from "@apollo/react-hooks";
import {Group} from "../../constants/types";
import GraphQLError from "../../components/Messages/Errors";

export interface GroupPageProps {
    match: {
        params: {
            group?: string
        }
        url: string
    }
}

const GET_GROUP = gql`
    query getGroup($gid: ID!) {
        group(gid: $gid) {
            ...groupBase
        }
    }
    ${groupBase}
`;

const SUB_ROUTES = {
    FRONT_PAGE: "/",
} as const;

function GroupPage(props: GroupPageProps) {
    const match = props.match;
    const gid = match.params.group || "";
    const {data, error, loading} = useQuery<{ group: Group }, { gid: string }>(
        GET_GROUP,
        {
            variables: {gid}
        }
    );
    const group = gid && data && data.group;
    const {user} = useContext(UserContext);

    let isAdmin = false;
    let isMember = false;
    let isSpeaker = false;

    if (gid && user) {
        isMember = user.memberOf.map(gr => gr.gid).indexOf(gid) !== -1;
        isAdmin = user.adminOf.map(gr => gr.gid).indexOf(gid) !== -1;
        isSpeaker = user.speakerOf.map(gr => gr.gid).indexOf(gid) !== -1;
    }

    return (
        <Container>
            {error && <GraphQLError error={error}/>}
            {loading && <GraphQLError error={error}/>}
            {group && (
                <Main group={group}/>
            )}
            <Menu pointing secondary color="purple">
                <Menu.Item
                    as={NavLink} exact to={match.url}
                    content="Page d'accueil"/>
                <Menu.Item
                    as={NavLink} to={match.url + "/annonces"}
                    content="Annonces"/>
                <Menu.Item
                    as={NavLink} to={match.url + "/qanda"}
                    content="Questions-Réponses"/>
                <Menu.Item
                    as={NavLink} to={match.url + "/events"}
                    content="Événements"/>
                <Menu.Item
                    as={NavLink} to={match.url + "/members"}
                    content="Membres"/>
                {isMember && (
                    <Menu.Item
                        as={NavLink} to={match.url + "/interne"}
                        position='right'
                        content="Page interne"/>
                )}
                {isAdmin && (
                    <Menu.Item
                        as={NavLink} to={match.url + "/admin"}
                        content="Administrer"/>
                )}
            </Menu>
            <Switch>
                {group && (
                    <Route path={SUB_ROUTES.FRONT_PAGE} render={() => (
                        <FrontPage frontPage={group.frontPage || ""} isSpeaker={isSpeaker} gid={group.gid}/>
                    )}/>
                )}
            </Switch>
        </Container>
    );
}

export default GroupPage;
