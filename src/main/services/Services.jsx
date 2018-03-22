import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import logo_gitlab from '../../assets/logo_gitlab_br.png';

class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container textAlign='justified'>
                    <Header as='h1'>
                        Services BR
                    </Header>
                    <p>
                        Le BR propose tout un ensemble de services aux étudiants de l'École polytechnique : hébergement de serveurs, sites pour les associations, machines de calcul, dépannage...
                        
                        Il tient une permanence tous les mardis et jeudis de 19h15 à 20h15.
                        
                        Venez avec vos problèmes, le BR veille :)
                    </p>
                    <Header as='h2'>
                        <a href="http://gitlab.binets.fr">GitLab</a>
                    </Header>
                    <Image src={logo_gitlab} size='medium' centered/>
                    <p>
                        GitLab est un service d'hébergement et de gestion de fichiers particulièrement adapté à du code informatique : que ça soit pour un PSC, un projet de cours de maths ou d'info, un P3A, un modal, du travail pour X-Projets, un site internet pour un binet ou association, vous pouvez y mettre ce que vous voulez.
                    </p>

                    <Header as='h2'>
                        <a href="http://carnets.binets.fr">Carnets</a>
                    </Header>
                    <p>
                        Carnets est un service d'édition et d'hébergement de fichiers écrits en Markdown, qui permet de prendre des notes, avec un aperçu en direct du résultat, et les partager avec d'autres tout en contrôlant finement quels utilisateurs peuvent voir le contenu ou l'éditer.
                    </p>

                    <Header as='h2'>
                        <a href="http://foyer.binets.fr">Foyer</a>
                    </Header>
                    <p>
                        Foyer, c'est le forum de discussion sur le platal : c'est l'endroit idéal pour chercher des fiches pour un cours, demander de l'aide pour un DM, trouver un partenaire de projet de MAP, sans avoir à faire un post timide sur Facebook qui se perdrait au milieu d'un océan d'annonces d'événements binets.
                    </p>
                </Container>
            </div>
        );
    }
}

export default Services;