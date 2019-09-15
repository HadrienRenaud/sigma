import React, {useContext} from "react";
import {Container, Menu} from "semantic-ui-react";
import Main from "./components/Main";
import {NavLink} from "react-router-dom";
import UserContext from "../../components/UserContext/context";

export interface GroupPageProps {
    match?: {
        params: {
            group?: string
        }
        url: string
    }
}

function GroupPage(props: GroupPageProps) {
    const match = props.match;
    const gid = match && match.params.group;
    const { user } = useContext(UserContext);

    let isAdmin = false;
    let isMember = false;

    if (gid && user) {
        isMember = user.memberOf.map(gr => gr.gid).indexOf(gid) !== -1;
        isAdmin = user.adminOf.map(gr => gr.gid).indexOf(gid) !== -1;
    }

    return (
        <Container>
            {gid && (
                <Main gid={gid}/>
            )}
            {match && (<>
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
            </>)}
        </Container>
    );
}

export default GroupPage;
