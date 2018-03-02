/** 
 * @file En-tête des pages sur Sigma.
*/

import React from 'react';
import { Menu, Button, Image, Container } from 'semantic-ui-react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import logo_sigma from '../assets/logo_sigma.png';

class HeaderUnrouted extends React.Component {

    //state = { }

    render() {
        return (

            <Menu>

                <Menu.Item as={NavLink} to='/home' content='Home'>
                    <Button> <Image alt='Logo' src={logo_sigma} size='mini' /> </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/calendar' content='Calendar'>Calendrier</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trombi' name='trombi'>
                    <Button>Trombinoscope</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/services' name='services'>
                    <Button>Services BR</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/createAccount' position='right' name='createAccount'>
                    <Button color="blue">Créer son compte</Button>
                </Menu.Item>

            </Menu>

        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;
