import React from 'react';

import { Header } from 'semantic-ui-react'; 
class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>
                    Services BR
                </h1>
                <p>
                    Le BR propose tout un ensemble de services aux étudiants de l'École polytechnique : hébergement de serveurs, sites pour les associations, machines de calcul, dépannage...
                    
                    Il tient une permanence tous les mardis et jeudis de 19h15 à 20h15.
                    
                    Venez avec vos problèmes, le BR veille :)
                </p>

                <h2>
                    <a href="https://gitlab.binets.fr">GitLab</a>
                </h2>
                <p>
                    Le BR propose un GitLab, un service d'hébergement et de collaboration pour du code, en s'appuyant sur le système de contrôle de version Git : programmes en Python ou Java, applications JavaScript, rapports en LaTeX, tout ce que vous voulez !
                </p>
            </div>
        );
    }
}

export default Services;