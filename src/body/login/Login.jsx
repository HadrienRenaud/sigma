/**
 * @file Page de connexion
 * @author guillaume.wang
 */
import React from 'react';
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import Error404 from '../../errors/Error404.jsx';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo_sigma from '../../../assets/logo_sigma.png';
import gql from 'graphql-tag';

import LoginForm from './LoginForm.jsx';

class Login extends React.Component {


    render() {
        return (
            <div className='login-form'>
                <Grid textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='blue' textAlign='center'>
                            <Image src={logo_sigma} />
                            Connexion
                        </Header>
                        <Segment raised>
                            <LoginForm />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
