/**
 * @file Components a render en cas d'erreur, 404 ou autre
 */

import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Image, Container, Header } from 'semantic-ui-react';
import poopSad from '../assets/poop-sad.png';

class Error404 extends React.Component {
    render() {
        return (
            <Container text textAlign="justified">
                <Header as='h1'>Erreur 404</Header>
                <p>Je n'ai pas trouvé, déso pas déso</p>

                <Image size='small' src={poopSad} style={{ marginTop: "2em" }} />
            </Container>
        );
    }
}

export { Error404 };
