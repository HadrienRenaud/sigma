/**
 * @file Trombinoscope On Line
 */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/** 
 * @constant Requête GraphQL pour récupérer tous les groupes.
*/
// TODO
const GET_ALLGROUPS = gql`
    query trombinoQuery {
        blablablabla
    }
`;

class Trombino extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "",
            nom: "",
            formation: "",
            promo: "",
            binet: "",
        };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        console.log("Submitting");
        console.log(this.state.userInput);
        console.log(this.state.passwordInput);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name; //l'attribut "name" du Component qui appelle ce handle (par un onChange)
        this.setState({ [name]: value }); //ES6 computed property name syntax
    }

    render() {
        return (
            <div>
                

            </div>
        );
    }
}

export default Trombino;
