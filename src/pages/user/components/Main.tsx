import React from "react";
import {Header, Image, List} from "semantic-ui-react";
import {User} from "../../../constants/types";

export interface MainProps {
    user: User
}

function Main(props: MainProps) {
    const {user} = props;

    return (
        <>
            <Image
                src={user.photo || "https://react.semantic-ui.com/images/wireframe/square-image.png"}
                floated="right" size='small' circular
            />
            <Header>
                {user.givenName} {user.lastName} {user.nickname && <>({user.nickname})</>}
                <Header.Subheader>@{user.uid}</Header.Subheader>
            </Header>
            <List>
                <List.Item icon="birthday" content={user.birthdate}/>
                <List.Item icon="flag outline" content={user.nationality}/>
                <List.Item icon="phone" content={<a href={"tel:" + user.phone}>{user.phone}</a>}/>
                {user.address && <List.Item icon="marker" content={user.address}/>}
                <List.Item
                    icon="mail"
                    content={<a href={`mailto:${user.mail}`}>{user.mail}</a>}
                />
            </List>
        </>
    );
}

export default Main;
