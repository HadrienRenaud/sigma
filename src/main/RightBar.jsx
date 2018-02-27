import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component } from 'semantic-ui-react';

const RightBar = () => ( //TODO change into semantic-ui-react
    <div>
        <div className="compact menu">
            <div className="ui simple dropdown item">
                [Profile picture]
                <div className="menu">
                    <div className="item">Profil</div>
                    <div className="item">Paramètres</div>
                    <div className="item">Déconnexion</div>
                </div>
            </div>
        </div>
    </div>
);

export default RightBar;