/**
 * @file un filler pour faire des tests
 * 
 * @author kadabra
*/
import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Header, Container, Image, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';
import paragraph from '../../assets/paragraph.jpg';


class DummyBody extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container text textAlign="justified">
                <Header as='h1'>Semantic UI React Fixed Template</Header>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>A text container is used for the main container, which is useful for single column layouts.</p>

                <Image src={paragraph} alt='hi' style={{ marginTop: "2em" }} />
                <Image src={paragraph} alt='hi' style={{ marginTop: "2em" }} />
                <Image src={paragraph} alt='hi' style={{ marginTop: "2em" }} />
                <Image src={paragraph} alt='hi' style={{ marginTop: "2em" }} />
            </Container>
        );
    }
}

export default DummyBody;
