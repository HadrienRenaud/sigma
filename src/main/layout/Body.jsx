import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Container} from 'semantic-ui-react';

import RightBar from './RightBar.jsx';
import Center from './Center.jsx';

import Background from '../../assets/sigma_bg.jpg';

// inline styling to render a background image.
// apparently it is better to use CSS classes but it would imply manipulating webpack
// https://reactjs.org/docs/faq-styling.html
const divStyle = {
    backgroundColor: 'blue',
    backgroundImage: `url(${Background})`
};

/**
 * La doc de Semantic UI "vanilla" (pas semantic-ui-react) semble indiquer qu'il y a 16 colonnes au total
 * 
 * En fait (en gros), normalement toutes les columns sont contenues dans une row
 * et c'est un des attributs du row qui definit le nombre de colonnes dans cette row
 * 
 * En semantic-ui-react, toutes les Component Grid.Column devraient etre contenues dans un Grid.Row
 * et c'est l'attribut columns={n} du Grid.Row qui definit le nombre de colonnes dans cette Row
 * 
 * Alternativement, l'attribut columns de Grid lui-meme permet de definir le nombre de columns par row.
 * 
 * Apparemment si on n'utilise pas Grid.Row et qu'on met directement Grid.Column comme children de Grid,
 * par defaut il y a 12 colonnes au total.
 * 
 * https://react.semantic-ui.com/collections/grid#grid-example-column-count
 */

const Body = () => (
    <Container>
        <Grid columns='equal'>
            {/*garder une barre d'information a gauche de la page*/}
            {/*TODO: 
            est-ce mieux de garder une barre a gauche (comme fait FB) ou a droite (comme fait frankiz)
            Quentin : À droite, c'est plus ludique.*/}
            <Grid.Column>
                <Center />
            </Grid.Column>

            <Grid.Column width={3}>
                <RightBar />
            </Grid.Column>

            {/*<Grid.Column width={3}>
                <RightBar/>
            </Grid.Column>*/}
        </Grid>
    </Container>
);

export default Body;
