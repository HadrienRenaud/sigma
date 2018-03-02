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
                <Menu.Item as={NavLink} to='/event' content='Calendar'>
                    Calendrier
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trombinoscope' name='trombi'>
                    Trombinoscope
                </Menu.Item>
                <Menu.Item as={NavLink} to='https://br.binets.fr/etudiants.php' name='services'>
                    Services BR
                </Menu.Item>
                <Menu.Item position='right' name='loginForm'>
                    <Button as={NavLink} to='/login' color="blue">Se connecter</Button>
                </Menu.Item>

            </Menu>

        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;
