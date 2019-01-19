/**
 * @file Header, le menu tout en haut d'un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 * autrement dit, c'est l'en-tête des pages
 */

import React from 'react';
import { Container, Divider, Dropdown, Grid, Image, List, Menu, Segment, Button } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo_sigma.png';



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
                        Sigma (WIP)
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
