import React, {Component} from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';
import FormulaireItem from './FormulaireItem.jsx';

/**
 * @file page de test d'un formulaire en React.
 * 
 * Attention, je suis passé sur une class,
 * je ne sais pas pourquoi la const ne fonctionne
 * pas, mais il semble que l'on doive avoir une
 * classe dynamique.
 */

class Formulaire extends Component {
    deleteProject(){
        this.props.onDelete(id);
    }

    render() {
        let projectItems;

        if(this.props.projects){
            projectItems = this.props.projects.map(project => {
                //console.log(project);
                return (
                    <FormulaireItem onDelete={this.deleteProject.bind(this)} key={project.type} project={project} />
                )
            });
        }

        return (
            <div>
                {projectItems}
            </div>
        );
    }
}

export default Formulaire;