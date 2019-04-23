/**
 * @file la page d'accueil d'un groupe, accessible par path='/group/:uid_du_group/'.
 * Contient un markdown de publicité stylée/de troll si c'est un binet pipo
 * (tandis que 'description' est un string court de description du groupe)
 *
 * Ainsi que les annonces et événements adressées à ce groupe.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Route, Link} from 'react-router-dom';

import {Button, Segment, Icon, Divider, Card} from 'semantic-ui-react';

class GroupFrontPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {frontPage} = this.props;

        return (
            <ReactMarkdown source={frontPage}/>
        );
    }

}

export default GroupFrontPage;
