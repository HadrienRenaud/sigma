/** 
 * @file Component definissant l'en-tête des pages sur Sigma. Comporte des NavLink et c'est tout
*/

import React from 'react';
import { Menu, Button, Image, Container } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import logo_sigma from '../../assets/logo_sigma.png';

class Header extends React.Component {

    render() {
        return (

            <Menu>

                {/*NavLink to path /, telling Center to render main/index/Index.jsx*/}
                <Menu.Item as={NavLink} to='/#'>
                    <Image alt='Logo' src={logo_sigma} size='mini' />
                </Menu.Item>

                {/*NavLink to path /calendar, telling Center to render [TODO]*/}
                <Menu.Item as={NavLink} to='/event'>
                    Calendrier
                </Menu.Item>

                {/*NavLink to path /tol, telling Center to render main/trombino/Trombino.jsx*/}
                <Menu.Item  as={NavLink} to='/tol' name='tol'>
                    Trombinoscope
                </Menu.Item>

                {/*NavLink to path /services, telling Center to render main/services/Services.jsx*/}
                <Menu.Item  as={NavLink} to='/services' name='services'>
                    Services BR
                </Menu.Item>

                <Menu.Item as="h4">
                    {localStorage.getItem('token') || "no token"}
                </Menu.Item>

                {/*NavLink to path /login, telling Center to render main/login/Login.jsx*/}
                <Menu.Item as={NavLink} to='/login' position='right' name='loginForm'>
                    <Button color="blue">Se connecter</Button>
                </Menu.Item>

            </Menu>

        );
    }
}

export default Header;
