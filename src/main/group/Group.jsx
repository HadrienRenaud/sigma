import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Route, Switch, Link } from 'react-router-dom';
import Error404 from '../../Errors.jsx';
import {Button, Sticky} from 'semantic-ui-react';

import GroupAnnouncements from './GroupAnnouncements.jsx';
import GroupEvents from './GroupEvents.jsx';
import GroupMembers from './GroupMembers.jsx';
import GroupSettings from './GroupSettings.jsx';
import ListGroups from './ListGroups.jsx';

class GroupFoundUnrouted extends React.Component { //TODO change into semantic-ui-react
    state = {}

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    setContextRef = contextRef => this.setState({contextRef})

    render() {
        const{ contextRef } = this.state;
        const { match, location, history } = this.props;

        return(
            <div ref={this.setContextRef}>
                <div className="ui attached fixed" /*style={{position:"fixed"}}, TODO: Find how to add Sticky*/>
                    <div className="top attached ui menu segment">
                        <h2 className="left menu">Nom du groupe</h2>
                        <div className="right menu ui icon buttons">
                            <button className="yellow ui button">
                                <i className="star icon"></i>
                            </button>
                            <button className="blue ui button">
                                <i className="pin icon"></i>
                            </button>
                            <button className="pink ui button">
                                <i className="heart icon"></i>
                            </button>
                        </div>
                    </div>
                    <Button.Group fluid attached="top">
                        <Button as={Link} to={match.url}>Annonces</Button>
                        <Button as={Link} to={match.url+"/events"}>Évènements</Button>
                        <Button as={Link} to={match.url+"/members"}>Membres</Button>
                        <Button as={Link} to={match.url+"/settings"}>Paramètres</Button>
                    </Button.Group>
                </div>
                <div className="ui attached segment">
                    <Switch>
                        <Route path={match.url+"/events"} component={GroupEvents}/>
                        <Route path={match.url+"/members"} component={GroupMembers}/>
                        <Route path={match.url+"/settings"} component={GroupSettings}/>
                        <Route component={GroupAnnouncements}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const GroupFound = withRouter(GroupFoundUnrouted);

const Group = ({match}) => (
    <div>
        <Switch>
            <Route path={match.url+"/list"} component={ListGroups}/>
            <Route path={match.url+"/:id"} component={GroupFound}/>
            <Route component={Error404}/>
        </Switch>
    </div>
);

export default Group;