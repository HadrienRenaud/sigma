/**
 * @file homepage de shitpost
 * 
 * @author kadabra
*/
import React from 'react';

import { Container, Header } from "semantic-ui-react";


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container text textAlign="justified">
                <Header as='h1'>Welcome to Shitpost!</Header>
                <Header as='h2'>Site's homepage</Header>
                <p>This site is not finished (at all), please come back later :)</p>
            </Container>
        );
    }
}

export default Home;
