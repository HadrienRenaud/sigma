/**
 * @file Description and posts of the channel specified in the URL
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



class Channel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>Channel</Header>
                <p>Description and posts of the specified channel (TODO)</p>
            </div>
        );
    }
}

/*
Channel.propTypes = {
    myProp: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};
*/

export default Channel;
