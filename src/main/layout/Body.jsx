/**
 * @file Le "milieu" de la page, entre Header et Footer.
 * Il est lui-meme divise (horizontalement cette fois) en Center et SideBar
 */
import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid, Container} from 'semantic-ui-react';

import Event from '../messages/Event.jsx';
import Index from '../index/Index.jsx';
import GroupView from '../groups/GroupView.jsx';
import AllGroups from '../groups/AllGroups.jsx';
import {Error404} from '../Errors.jsx';
import Trombino from '../trombino/Trombino.jsx';
import Services from '../services/Services.jsx';

import SideBar from './SideBar.jsx';

import Background from '../../assets/sigma_bg.jpg';
import UserPage from "../users/UserPage.jsx";

// inline styling to render a background image.
// apparently it is better to use CSS classes but it would imply manipulating webpack
// https://reactjs.org/docs/faq-styling.html
const divStyle = {
    backgroundColor: 'blue',
    backgroundImage: `url(${Background})`
};

/**
 * La doc de Semantic UI "vanilla" (pas semantic-ui-react) semble indiquer qu'il y a 16 "colonnes" au total
 * ou plus exactement que la page a une "width" de 16.
 * 
 * 
 * En semantic-ui-react, toutes les Component Grid.Column devraient etre contenues dans un Grid.Row
 * et c'est l'attribut columns={n} du Grid.Row qui definit le nombre de colonnes dans cette Row.
 * 
 * Alternativement, l'attribut columns de Grid lui-meme permet de definir le nombre de columns par row.
 * 
 * En fonction du nombre de colonnes, la taille de chaque colonne est optimisee par semantic-ui pour etre joli.
 * 
 * 
 * Apparemment si on ne precise rien, et qu'on set directement le width dans Grid.Column,
 *  par defaut il y a 12 "colonnes" au total.
 * 
 * https://react.semantic-ui.com/collections/grid#grid-example-column-count
 */

class Body extends React.Component {
    render () {
        return (
            <Container>
                <Grid columns='equal'>
                    {/*garder une barre d'information a gauche de la page*/}
                    <Grid.Column>
                        <Switch> {/*forces exclusive path matching*/}
                            <Route path="/event" component={Event} />
                            <Route exact path="/groups" component={AllGroups} />
                            <Route path="/groups/:gid" component={GroupView} />{/*pour les paths de la forme "/groups/:gid"*/}
                            <Route path="/tol" component={Trombino} /> {/*l'appelation TOL est tradi.*/}
                            <Route path="/services" component={Services} />
                            <Route path="/users/:uid" component={UserPage} />
                            <Route path="/me" component={() => <UserPage uid={localStorage.getItem("uid")}/>}/>x
                            <Route exact path="/" component={Index} />
                            <Route component={Error404} />
                        </Switch>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <SideBar />
                    </Grid.Column>

                </Grid>
            </Container>
        );
    }
}

export default Body;
