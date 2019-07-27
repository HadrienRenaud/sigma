import React from 'react';
import {Button, Dropdown, Image, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {UserContext} from "../utils/contexts.jsx";


const LoggedInUserDropdown = ({ user }) => (
    <Dropdown item trigger={
        <Image
            src='https://react.semantic-ui.com/images/wireframe/square-image.png'
            avatar/>
    }>
        <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to='/me' name="me">
                <strong>{user.givenName} {user.lastName}</strong>
                <br/>
                @{user.uid}
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item as={NavLink} to='/login' name='loginForm'>
                Se Déconnecter
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
);

const AnonymousUserDropdown = () => (
    <Menu.Item as={NavLink} to='/login' name='loginForm'>
        <Button color="blue">Se connecter</Button>
    </Menu.Item>
);

export const UserMenuDropdown = () => (
    <UserContext.Consumer>
        {(user) => {
            if (user === "anonymous")
                return <AnonymousUserDropdown />;
            else
                return <LoggedInUserDropdown user={user}/>;
        }}
    </UserContext.Consumer>
);
