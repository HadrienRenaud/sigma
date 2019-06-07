/**
 * @file Component definissant l'en-tête des pages sur Sigma. Comporte des NavLink et c'est tout
 */

import React from 'react';
import {Menu, Button, Image, Dropdown, Container} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import logo_sigma from '../../assets/logo_sigma.png';
import {UserContext} from "../utils/contexts.jsx";

class Header extends React.Component {

    onLogOut() {
        localStorage.clear();
        if (this.props.onLogOut)
            this.props.onLogOut();
    }

    render() {
        return <Menu inverted color="violet">
            <Container>

                {/*NavLink to path /, telling Center to render main/index/Index.jsx*/}
                <Menu.Item as={NavLink} to='/#'>
                    <Image alt='Logo' src={logo_sigma} avatar/>
                </Menu.Item>

                <Menu.Item as={NavLink} to="/groups">
                    Associations
                </Menu.Item>

                {/*NavLink to path /calendar, telling Center to render [TODO]*/}
                <Menu.Item as={NavLink} to='/events'>
                    Calendrier
                </Menu.Item>

                {/*NavLink to path /tol, telling Center to render main/trombino/Trombino.jsx*/}
                <Menu.Item as={NavLink} to='/tol' name='tol'>
                    Trombinoscope
                </Menu.Item>

                {/*NavLink to path /services, telling Center to render main/services/Services.jsx*/}
                <Menu.Item as={NavLink} to='/services' name='services'>
                    Services BR
                </Menu.Item>

                <Menu.Menu position='right'>

                    {/*
                    If connected :
                       Dropdown with menu, logout etc.
                    If not
                        NavLink to path /login, telling Center to render main/login/Login.jsx
                    */}
                    <UserContext.Consumer>
                        {(user) => {
                            console.log("Consumer user : ", user);
                            return user !== "anonymous" ?
                                <Dropdown item trigger={
                                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png'
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
                                :
                                <Menu.Item as={NavLink} to='/login' position='right' name='loginForm'>
                                    <Button color="blue">Se connecter</Button>
                                </Menu.Item>;
                        }
                        }
                    </UserContext.Consumer>
                </Menu.Menu>
            </Container>
        </Menu>;
    }
}

export default Header;
