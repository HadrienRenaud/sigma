/** 
 * @file En-tête des pages sur Sigma.
*/

import React from 'react';
import { Menu, Button, Image, Container } from 'semantic-ui-react';
import { withRouter, Link, NavLink } from 'react-router';
import logo_sigma from '../assets/logo_sigma.png';

class HeaderUnrouted extends React.Component {

    /*
    
    state = { 
        activeItem: 'trombi'
    }

    /**
     * @function Change l'élément actif.
     

    handleClick = (e, { name }) => this.setState({ activeItem: name })

    */

    render() {
        //const activeItem = this.state.activeItem;

        return (
            
            <Menu>
                <Menu.Item as={Link} exact to='/' content="Status" />
                <Menu.Item as={Link} to="/queue" content="Hold Queue" />
                <Menu.Item as={NavLink} to="/messages" content="Messages" />
                <Menu.Item as={NavLink} to="/stats" content="Stats" />

                {/*
                <Menu.Item as={Link} to='/home' content='Home'>
                    <Button> <Image alt='Logo' src={logo_sigma} size='mini' /> </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to='/calendar' content='Calendar'>Calendrier</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trombi' name='trombi' active={activeItem === 'trombi'}>
                    <Button>Trombinoscope</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/services' name='services' active={activeItem === name}>
                    <Button>Services BR</Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/createAccount' position='right' name='createAccount' active={activeItem === name}>
                    <Button color="blue">Créer son compte</Button>
                </Menu.Item>
                */}
            </Menu>
            
        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;