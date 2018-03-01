/** 
 * @file En-tête des pages sur Sigma.
*/

import React from 'react';
import { Menu, Button, Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router';
import logo_sigma from '../assets/logo_sigma.png';

class HeaderUnrouted extends React.Component {
    state = { 
        activeItem: 'trombi'
    }

    /**
     * @function Change l'élément actif.
     */
    handleClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const activeItem = this.state.activeItem;

        return (
            <Menu>
                <Menu.Item name='home' active={activeItem === 'home'}>
                    <Image alt='Logo' src={logo_sigma} size='mini' /> {/* shit works yo */}
                </Menu.Item>
                <Menu.Item name='calendar' active={activeItem === name}>
                Calendrier
                </Menu.Item>
                <Menu.Item name='trombi' active={activeItem === name}>
                Trombinoscope
                </Menu.Item>
                <Menu.Item name='services' active={activeItem === name}>
                Services BR
                </Menu.Item>
                <Menu.Item position='right' name='createAccount' active={activeItem === name}>
                    <Button color="blue">Créer son compte</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;