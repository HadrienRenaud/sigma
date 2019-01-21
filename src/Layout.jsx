/**
 * @file un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 *      fait aussi le routage "principal"
 */

import React from 'react';
import { Container, Grid, Segment } from "semantic-ui-react";
import { Switch, Route } from 'react-router-dom';

import TopMenu from './layout/TopMenu.jsx';
import Footer from './layout/Footer.jsx';

//import xxxxx from './body/xxxxx.jsx';
import DummyBody from './body/DummyBody.jsx';
import Error404 from './errors/Error404.jsx';
import Index from './body/index/Index.jsx';

import Trombino from "./body/trombino/Trombino.jsx";
import AllGroups from "./body/AllGroups.jsx";
import GroupView from "./body/groups/GroupView.jsx";
import Services from "./body/services/Services.jsx";
import Login from "./body/login/Login.jsx";
import SideBar from "./layout/SideBar.jsx";
import Event from "./body/Event.jsx";
import PostFeed from "./widgets/PostsFeed.jsx"
import UserPage from "./body/trombino/UserPage.jsx";

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let inlineStyleBodySegment = {
            marginTop: "2em",
            marginBottom: "2em",
            backgroundColor: "lightgrey"
        };

        return (
            <div>
                <TopMenu />

                <Container> {/*center the whole thing*/}
                    <Grid columns='equal'>

                        <Grid.Column width={3}>
                            <SideBar/>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment style={inlineStyleBodySegment}> {/*colorize over the background, sinon on voit rien*/}

                                <div id='body'>
                                <Switch> {/*forces exclusive path matching (render only first match)*/}
                                    <Route exact path="/home" component={Index} />
                                    <Route path="/tol" component={Trombino} /> {/*l'appellation TOL est tradi.*/}

                                    <Route exact path="/groups" component={AllGroups} />
                                    <Route path="/groups/:uid" component={GroupView} />{/*pour les paths de la forme "/groups/:uid"*/}
                                    <Route exact path="/events" component={Event} />
                                    <Route path="/events/:mid" component={Event} />
                                    <Route exact path="/news" component={PostFeed} />
                                    <Route path="/news/:mid" component={PostFeed} />
                                    <Route path="/user/:uid" component={UserPage} />
                                    <Route path="/services" component={Services} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/" component={Index} />
                                    <Route path="/test" component={DummyBody} />
                                    <Route component={Error404} />
                                </Switch>
                                </div>

                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>

                <Footer />
            </div>
        );
    }
}

export default Layout;
