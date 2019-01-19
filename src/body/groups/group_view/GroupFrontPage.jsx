/**
 * @file la page d'accueil d'un groupe, accessible par path='/group/:uid_du_group/'.
 * Contient un markdown de publicité stylée/de troll si c'est un binet pipo
 * (tandis que 'description' est un string court de description du groupe)
 * 
 * Ainsi que les annonces et événements adressées à ce groupe.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';

class GroupFrontPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { frontPage } = this.props;
        
        return (
            <div>
                <p>Group Front Page</p>
                <ReactMarkdown source={frontPage} />
            </div>
        );
    }

}

export default GroupFrontPage;
