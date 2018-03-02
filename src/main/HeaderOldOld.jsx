import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class HeaderUnrouted extends React.Component {
    render() {
        return (
            <Menu fixed='top' inverted>
                {/*  <Container>*/}
                <Menu.Item header>
                        Postmaster
                </Menu.Item>

                <Menu.Item as={Link} exact to="/" content="Status" />
                <Menu.Item as={Link} to="/queue" content="Hold Queue" />
                <Menu.Item as={Link} to="/messages" content="Messages" />
                <Menu.Item as={Link} to="/stats" content="Stats" />

                {/*  </Container>*/}
            </Menu>
        );
    }
}

const Header = withRouter(HeaderUnrouted);
export default Header;
