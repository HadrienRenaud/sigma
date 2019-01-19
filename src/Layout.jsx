/**
 * @file un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 *      fait aussi le routage "principal"
 */

import React from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink, Switch, Route } from 'react-router-dom';

import TopMenu from './layout/TopMenu.jsx';
import Footer from './layout/Footer.jsx';
import SideBar from './layout/SideBar.jsx';

//import xxxxx from './body/xxxxx.jsx';
import DummyBody from './body/DummyBody.jsx';
import { Error404 } from './Errors.jsx';

import mainBg from '../assets/dechets.jpg';



class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //TODO: this inline css styling may be (probably, I don't know much css) bad practice...
        let inlineStyleBg = {
            backgroundImage: "url(" + mainBg + ")",
            backgroundRepeat: "repeat-y",
            backgroundSize: "cover"
        };

        let inlineStyleBodySegment = {
            marginTop: "2em",
            marginBottom: "2em",
            backgroundColor: "lightgrey"
        };

        return (
            <div style={inlineStyleBg}>
                <TopMenu />

                <Container> {/*center the whole thing*/}
                    <Grid columns='equal'>

                        <Grid.Column>
                            <Segment style={inlineStyleBodySegment}> {/*colorize over the background, sinon on voit rien*/}

                                <div id='body'>
                                <Switch> {/*forces exclusive path matching (render only first match)*/}
                                    <Route exact path="/home" component={Index} />
                                    <Route path="/tol" component={Trombino} /> {/*l'appellation TOL est tradi.*/}

                                    <Route exact path="/groups" component={AllGroups} />
                                    <Route path="/groups/:uid" component={GroupView} />{/*pour les paths de la forme "/groups/:uid"*/}
                                    <Route exact path="/events" component={AllEvents} />
                                    <Route path="/events/:mid" component={EventView} />
                                    <Route exact path="/news" component={AllAnnouncements} />
                                    <Route path="/news/:mid" component={AnnouncementView} />

                                    <Route path="/services" component={Services} />
                                    
                                    <Route exact path="/" component={Index} />
                                    <Route path="/test" component={DummyBody} />
                                    <Route component={NotFound} />
                                </Switch>
                                </div>

                            </Segment>
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <p>Coucou !</p>
                            {/*<SideBar />*/}
                        </Grid.Column>

                    </Grid>
                </Container>

                <Footer />
            </div>
        );
    }
}

export default Layout;
