/**
 * @file homepage de shitpost
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



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
