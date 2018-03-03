/**
 * @file Page de connexion
 * @author guillaume.wang
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Error404 from '../../Errors.jsx';
import { Button, Sticky, Icon, Popup } from 'semantic-ui-react';

import LoginForm from './LoginForm.jsx';

class LoginUnrouted extends React.Component {
    state = {}

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    setContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { contextRef } = this.state;
        const { match, location, history } = this.props;

        return (
            <div ref={this.setContextRef}>
                coucou ici Login.jsx
            </div>
        );
    }
}

const Login = withRouter(LoginUnrouted);
/*
const Group = ({ match }) => (
    <div>
        <Switch>
            <Route path={match.url + "/list"} component={ListGroups} />
            <Route path={match.url + "/:id"} component={GroupFound} />
            <Route component={Error404} />
        </Switch>
    </div>
);
*/

export default Login;
