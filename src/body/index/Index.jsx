/**
 * @file page d'accueil. Ce Component wrap tous les minimodules presents sur la page d'accueil.
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

import PostsFeed from '../../widgets/PostsFeed.jsx';



class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Container text textAlign="justified">
                    <Header as='h1'>Welcome to Sigma, the nouveau Frankiz!</Header>
                    <Header as='h2'>Site's homepage</Header>
                    <p>This site is not finished (at all), please come back later :)</p>
                </Container>

                {/*<ControlledComponentFormDemo/>*/}
                {/*<TOS/>*/}
                {/*
                <p>Voici juste un form de test, il n'est pas persistant !</p>
                <p>Please don't test, it works.</p>
                <AddFormulaire addProject={this.handleAddProject.bind(this)}/>
                <Formulaire projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                */}
                {/* <GroupAnnouncements/> */}

                <h1>Fil d'actualités</h1>
                <PostsFeed />

            </div>
        );
    }
}

export default Index;
