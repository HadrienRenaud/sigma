/**
 * @file template a copier/modifier quand j'ai la flemme d'ecrire les import et la definition de la classe
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment} from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



class MyComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                blablabla
            </div>
        );
    }
}

MyComponent.propTypes = {
    myProp: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};

export default MyComponent;
