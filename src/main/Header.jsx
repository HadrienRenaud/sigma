/** 
 * @file En-tête des pages sur Sigma.
*/

import React from 'react';
import { Menu, Button, Image, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import logo_sigma from '../assets/logo_sigma.png';

class HeaderUnrouted extends React.Component {

    //state = { }

    render() {
        return (

            <Menu>

                <Menu.Item as={NavLink} to='/#' content='Home'>
                    <Image alt='Logo' src={logo_sigma} size='mini' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/calendar' content='Calendar'>
                    Calendrier
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trombinoscope' name='trombi'>
                    Trombinoscope
                </Menu.Item>
                <Menu.Item as={NavLink} to='/services' name='services'>
                    Services BR
                </Menu.Item>
                <Menu.Item as={NavLink} to='/LoginForm' position='right' name='loginForm'>
                    <Button color="blue">Se connecter</Button>
                </Menu.Item>

            </Menu>

        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;
