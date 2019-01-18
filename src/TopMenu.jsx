/**
 * @file Header, le menu tout en haut d'un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 */

import React from 'react';
import { Container, Divider, Dropdown, Grid, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/poop-logo.png';



class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu inverted>
                <Container>
                    <Menu.Item as={Link} to='/home' header title="shitpost, l'application de merde">
                        <Image size='mini' src={logo} alt="logo de poop"
                            style={{ marginRight: "1.5em" }}
                        />
                        sH*tPost
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/test' header>
                        page de test
                    </Menu.Item>
                    <Dropdown item simple text='Dropdown'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>

        );
    }
}

export default Header;
