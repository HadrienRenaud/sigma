/**
 * @file Header, le menu tout en haut d'un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 * autrement dit, c'est l'en-tête des pages
 */

import React from 'react';
import { Container, Divider, Dropdown, Grid, Image, List, Menu, Segment, Button } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/dev-logo.png';



//TODO: update the (Nav)Links...

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu inverted>
                <Container>

                    <Menu.Item as={Link} to='/home' header title="Sigma, le nouveau Frankiz">
                        <Image alt="logo" src={logo} size='mini' 
                            style={{ marginRight: "1.5em" }}
                        />
                        <s>sH*tPost</s> Sigma (WIP)
                    </Menu.Item>

                    <Menu.Item as={NavLink} to='/test'>
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
                    
                    {/*NavLink to path /, telling Center to render main/index/Index.jsx*/}
                    <Menu.Item as={NavLink} to='/#'>
                        <Image alt='Logo' src={logo} size='mini' />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/groups">
                        Associations
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

                    {/*NavLink to path /login, telling Center to render main/login/Login.jsx*/}
                    <Menu.Item as={NavLink} to='/login' position='right' name='loginForm'>
                        <Button color="blue">Se connecter</Button>
                    </Menu.Item>

                </Container>
            </Menu>

        );
    }
}

export default TopMenu;
