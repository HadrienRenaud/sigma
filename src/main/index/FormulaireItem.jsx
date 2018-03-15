import React, {Component} from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import {Header, Button, Image, Segment, Icon, Divider, Card } from 'semantic-ui-react';

class FormulaireItem extends Component {
    deleteProject(id){
        this.props.onDelete(id);
    }

    render() {
        return (
            <li className="FormulaireItem">
                {this.props.project.title} : {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a>
            </li>
        );
    }
}

export default FormulaireItem;