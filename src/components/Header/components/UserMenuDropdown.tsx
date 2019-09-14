import React from 'react';
import {Button, Dropdown, Image, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {User} from "../../../constants/types";
import UserContext from '../../UserContext/context';
import {ROUTES} from "../../../constants/routes";


interface LoggedInUserDropdown {
    user?: User,
    logout: () => void
}

const LoggedInUserDropdown = ({user, logout}: LoggedInUserDropdown) => (
    <Dropdown item trigger={
        <Image
            src={user && user.photo || 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
            avatar
        />
    }>
        <Dropdown.Menu>
            {user && (
                <Dropdown.Item as={NavLink} to={ROUTES.ME} name="me">
                    <strong>{user.givenName} {user.lastName}</strong>
                    <br/>
                    @{user.uid}
                </Dropdown.Item>
            )}
            <Dropdown.Divider/>
            <Dropdown.Item as={Button} onClick={logout} name='loginForm'>
                Se Déconnecter
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
);

const AnonymousUserDropdown = () => (
    <Menu.Item as={NavLink} to={ROUTES.LOGIN} name='loginForm'>
        <Button color="blue">Se connecter</Button>
    </Menu.Item>
);

export const UserMenuDropdown = () => (
    <UserContext.Consumer>
        {({anonymous, logout, user}) => {
            if (anonymous)
                return <AnonymousUserDropdown/>;
            else
                return <LoggedInUserDropdown user={user} logout={logout}/>;
        }}
    </UserContext.Consumer>
);
