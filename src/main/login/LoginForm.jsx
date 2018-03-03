import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Divider } from 'semantic-ui-react';
import logo_sigma_large from '../../assets/logo_sigma_large.png';

const LoginForm = () => (
    <div className='login-form'>
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image alt='Logo' src={logo_sigma_large} size='large' centered={true} />
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>Login</Button>
                        <Divider horizontal>Or</Divider>
                        <Button primary fluid size='large'>Inscription</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </div>
);

export default LoginForm;
