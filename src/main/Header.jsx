import React from 'react';
import { Menu, Button, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import sigmaLogo from '../../assets/logo_sigma.png';

/** 
 * @summary Classe codant pour le bandeau de sigma
*/
class HeaderUnrouted extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                    <Image alt='logo sigma' src={sigmaLogo} size='mini' /*Ne fonctionne pas pour le moment, voir comment implémenter une image*//>
                    <Menu.Header>Σigma</Menu.Header>
                </Menu.Item>
                <Menu.Item name='calendrier' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                Accueil
                </Menu.Item>
                <Menu.Item name='calendrier' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                Calendrier
                </Menu.Item>
                <Menu.Item name='calendrier' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                Trombinoscope
                </Menu.Item>
                <Menu.Item name='services_du_BR' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                Services BR
                </Menu.Item>

                <Menu.Item position='right' name='services_du_BR' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                    <Button color="teal">Sign up</Button>
                </Menu.Item>
            </Menu>
        );
    }
}

const Header = withRouter(HeaderUnrouted);

export default Header;