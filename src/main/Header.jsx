/** 
 * @file Component definissant l'en-tête des pages sur Sigma. Comporte des NavLink et c'est tout
*/

import React from 'react';
import { Menu, Button, Image, Container } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import logo_sigma from '../assets/logo_sigma.png';

class Header extends React.Component {

    render() {
        return (

            <Menu inverted>

                {/*NavLink to path /, telling Center to render main/Index.jsx*/}
                <Menu.Item as={NavLink} to='/#'>
                    <Image alt='Logo' src={logo_sigma} size='mini' />
                </Menu.Item>

                {/*NavLink to path /calendar, telling Center to render [TODO]*/}
                <Menu.Item as={NavLink} to='/calendar'>
                    Calendrier
                </Menu.Item>

                {/*NavLink to path /trombino, telling Center to render [TODO]*/}
                <Menu.Item as={NavLink} to='/trombino' name='trombi'>
                    Trombinoscope
                </Menu.Item>

                {/*NavLink to path /services, telling Center to render [TODO]*/}
                <Menu.Item as={NavLink} to='/services' name='services'>
                    Services BR
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
