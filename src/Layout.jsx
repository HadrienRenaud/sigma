/**
 * @file un Component de layout que j'ai copié de https://react.semantic-ui.com/layouts/fixed-menu
 *      fait aussi le routage "principal"
 */

import React from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link, NavLink, Switch, Route } from 'react-router-dom';

import TopMenu from './TopMenu.jsx';
import Footer from './Footer.jsx';

import Home from './body/Home.jsx';
import ListChannels from './body/ListChannels.jsx';
import ListMessages from './body/ListMessages.jsx';
import Channel from './body/Channel.jsx';
import Message from './body/Message.jsx';
import WritePost from './body/WritePost.jsx';
import Admin from './body/Admin.jsx';
import DummyBody from './body/DummyBody.jsx';
import { Error404 } from './Errors.jsx';

//import Login from './body/Login.jsx'; //not used

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

                <Container> {/*center the segment*/}
                    <Segment style={inlineStyleBodySegment}> {/*colorize over the background*/}
                        <Switch> {/*forces exclusive path matching (render only first match)*/}
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/channels" component={ListChannels} />
                            <Route path="/channels" component={Channel} />
                            <Route exact path="/messages" component={ListMessages} />
                            <Route path="/messages" component={Message} />
                            <Route exact path="/writepost" component={WritePost} />
                            <Route path="/admin" component={Admin} />
                            <Route exact path="/test" component={DummyBody} />
                            <Route exact path="/" component={Home} />
                            <Route component={Error404} />
                        </Switch>
                    </Segment>
                </Container>


                <Footer />
            </div>
        );
    }
}

export default Layout;
