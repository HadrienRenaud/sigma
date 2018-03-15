import React, {Component} from 'react';
import uuid from 'uuid';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import GroupAnnouncements from '../group/GroupAnnouncements.jsx';
import Formulaire from './Formulaire.jsx';
import logo_sigma_large from '../../assets/logo_sigma_large.png';
import AddFormulaire from './AddFormulaire.jsx';

/**
 * @file page d'accueil. ce Component wrap tous les minimodules presents sur la page d'accueil
 */

class Index extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    //Life cycle method, aller voir internet ce que ça veut dire
    componentWillMount() {
        this.setState({projects:[
            {
                id:uuid.v4(),
                title: 'Business Website',
                category:'Web Design'
            },
            {
                id:uuid.v4(),
                title: 'Social App',
                category:'Mobile Development'
            },
            {
                id:uuid.v4(),
                title: 'Ecommerce Shopping Cart',
                category:'Web Developement'
            }
        ]})
    }

    handleAddProject(project) {
        let projects = this.state.projects;
        projects.push(project);
        this.setState({projects:projects});
    }


    handleDeleteProject(id) {
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);
        projects.splice(index, 1);
        this.setState({projects:projects});
    }

    render() {
        return (
            <div>
                <p>Page d'accueil (Index)</p>

                <p>Voici juste un form de test, il n'est pas persistant !</p>
                <p>Please don't test, it works.</p>
                <AddFormulaire addProject={this.handleAddProject.bind(this)}/>
                <Formulaire projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                {/* <GroupAnnouncements/> */}
            </div>
        )
    }
}

export default Index;