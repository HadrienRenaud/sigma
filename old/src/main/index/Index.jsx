import React, {Component} from 'react';
import uuid from 'uuid';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';
// import GroupAnnouncements from '../group/GroupAnnouncements.jsx'; 
// this is not the file you are looking for. ca c'est juste pour group_view, le resume de "mes annonces" est dans [TODO].jsx
import logo_sigma_large from '../../assets/logo_sigma_large.png';
import ControlledComponentFormDemo from './testComp/ControlledComponentFormDemo.jsx';
import PostsFeed from '../messages/PostsFeed.jsx';
import TOS from './minimodules/TOS/TOS.jsx';
/**
 * @file page d'accueil. ce Component wrap tous les minimodules presents sur la page d'accueil
 */

class Index extends React.Component {

    render() {
        return (
            <div>
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
                <PostsFeed/>
            </div>
        );
    }
}

export default Index;