/**
 * @file Admin view of all the site (TODO entièrement bien sûr, et ce sera long :P)
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.password == "bulbizarre") {
            return (
                <Segment>
                    <Header>Admin view frontend de Shitpost</Header>
                    <p>:P (TODO)</p>
                </Segment>
            );
        } else {
            return (
                <div>
                    wrong password
                </div>
            );
        }
    }
}

Admin.propTypes = {
    password: PropTypes.any.isRequired
};

export default Admin;
