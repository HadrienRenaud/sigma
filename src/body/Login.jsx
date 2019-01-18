/**
 * @file fichier avec les handlers pour se login sur shitpost. 
 * 
 * @author kadabra
*/
import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                login page with handlers etc.
            </div>
        );
    }
}

export default Login;
