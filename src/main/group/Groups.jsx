import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import Error404 from '../Errors.jsx';
import {Button, Sticky, Icon, Popup, Label} from 'semantic-ui-react';

import GroupAnnouncements from './GroupAnnouncements.jsx';
import GroupEvents from './GroupEvents.jsx';
import GroupMembers from './GroupMembers.jsx';
import GroupSettings from './GroupSettings.jsx';
import GroupList from './GroupList.jsx';

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
                        <Popup
                            trigger={<Button color='yellow' icon='star' />}
                            content='Devenir administrateur'
                            inverted
                        />
                        <Popup
                            trigger={<Button color='blue' icon='user' />}
                            content='Devenir membre'
                            inverted
                        />
                        {/*<Popup
                                trigger={<Button color='pink' icon='heart' />}
                                content='Devenir sympathisant'
                                inverted
                            />*/}
                        <Popup
                            trigger={<Button as='div' labelPosition='right'>
                                <Button color='pink'>
                                    <Icon name='heart' />
                                </Button>
                                <Label as='a' basic color='pink' pointing='left'>2,048</Label>
                            </Button>}
                            content='Devenir sympathisant'
                            inverted
                        />
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

const Groups = ({match}) => (
    <div>
        <Switch>
            <Route path={match.url+"/list"} component={GroupList}/>
            <Route path={match.url+"/:id"} component={GroupFound}/>
            <Route component={Error404}/>
        </Switch>
    </div>
);

export default Groups;