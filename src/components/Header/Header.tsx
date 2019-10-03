/**
 * @file Component definissant l'en-tête des pages sur Sigma. Comporte des NavLink et c'est tout
 */

import React from 'react';
import {Container, Icon, Image, Menu, Responsive, Sidebar} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
// @ts-ignore
import logo_sigma from "../../assets/logo_sigma.png";
import {UserMenuDropdown} from './components/UserMenuDropdown';
import {ROUTES} from "../../constants/routes";

const SEPARATION_MOBILE: number = Number(Responsive.onlyComputer.minWidth);

const menuItems = [
    {
        linkTo: ROUTES.ASSOCIATIONS,
        label: "Associations",
    },
    {
        linkTo: ROUTES.EVENTS,
        label: "Calendrier",
    },
    {
        linkTo: ROUTES.TOL,
        label: "Trombinoscope",
    },
];

interface HeaderSidebarProps {
    visible: boolean,
    hideSidebar: () => void,
}

export const HeaderSidebar = ({visible, hideSidebar}: HeaderSidebarProps) => (
    <Responsive maxWidth={SEPARATION_MOBILE - 1}>
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            onHide={hideSidebar}
            vertical
            visible={visible}
            color="violet"
            inverted
        >
            {menuItems.map(item => (
                <Menu.Item as={NavLink} to={item.linkTo} key={item.linkTo}>
                    {item.label}
                </Menu.Item>
            ))}
        </Sidebar>
    </Responsive>
);

export interface HeaderProps {
    onLogOut?: () => void,
    showSidebar: () => void,
}

class Header extends React.Component<HeaderProps> {
    onLogOut() {
        if (this.props.onLogOut)
            this.props.onLogOut();
    }

    render() {
        return <>
            <Responsive minWidth={SEPARATION_MOBILE}>
                <Menu inverted color="violet">
                    <Container>
                        <Menu.Item as={NavLink} to='/#'>
                            <Image alt='Logo' src={logo_sigma} avatar/>
                        </Menu.Item>

                        {menuItems.map(item => (
                            <Menu.Item as={NavLink} to={item.linkTo} key={item.linkTo}>
                                {item.label}
                            </Menu.Item>
                        ))}

                        <Menu.Menu position='right'>
                            <UserMenuDropdown/>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </Responsive>
            <Responsive maxWidth={SEPARATION_MOBILE - 1}>
                <Menu inverted color="violet">
                    <Container>
                        <Sidebar.Pusher>
                            <Menu.Item
                                onClick={this.props.showSidebar}
                                style={{display: 'flex', alignItems: 'center', height: '100%'}}
                            >
                                <Icon name="bars"/>
                            </Menu.Item>
                        </Sidebar.Pusher>

                        <Menu.Item as={NavLink} to='/#'>
                            <Image alt='Logo' src={logo_sigma} avatar/>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <UserMenuDropdown/>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </Responsive>
        </>;
    }
}

export default Header;
