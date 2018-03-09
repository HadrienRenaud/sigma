import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Image, Segment, Icon, Component, Grid, Container, Header, List, Divider } from 'semantic-ui-react';
import logo_sigma from '../../assets/logo_sigma.png';

const Footer = () => (
    <div>
        <Segment
            inverted
            vertical
            style={{ margin: '2em 0em 0em', padding: '2em 0em' }}
        >
            <Container textAlign='center'>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 1' />
                            <List link inverted>
                                <List.Item as='Link'>Link One</List.Item>
                                <List.Item as='Link'>Link Two</List.Item>
                                <List.Item as='Link'>Link Three</List.Item>
                                <List.Item as='Link'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 2' />
                            <List link inverted>
                                <List.Item as='a'>Link One</List.Item>
                                <List.Item as='a'>Link Two</List.Item>
                                <List.Item as='a'>Link Three</List.Item>
                                <List.Item as='a'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Group 3' />
                            <List link inverted>
                                <List.Item as='a'>Link One</List.Item>
                                <List.Item as='a'>Link Two</List.Item>
                                <List.Item as='a'>Link Three</List.Item>
                                <List.Item as='a'>Link Four</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Footer Header' />
                            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Divider inverted section />
                <Image
                    centered
                    size='mini'
                    src={logo_sigma}
                />
            </Container>
        </Segment>


    </div>
);

export default Footer;
