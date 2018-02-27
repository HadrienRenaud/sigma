import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component } from 'semantic-ui-react';

const Header = () => (
    <div className="ui inverted menu">

        <div className="ui container">
            <a href="#" className="header item">
                Sigma
            </a>
            <a href="#" className="item">Accueil</a>
            <a href="#" className="item">Calendrier</a>
            <a href="#" className="item">Trombinoscope</a>
            <a href="#" className="item">Services du BR</a>
            <div className="right aligned item">
                <a href="#" className="item">Search bar</a>
                <a href="#" className="item">Login</a>
            </div>
        </div>

    </div>
);

export default Header;