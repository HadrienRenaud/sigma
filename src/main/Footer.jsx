import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component, Grid, Container, Header, List, Divider } from 'semantic-ui-react';

const Footer = () => (
    <div>
        <Divider hidden />
        <Divider hidden />
        <Container textAlign='center'>
            This is the bottom <Icon name='hand outline down' />
        </Container>
        <Divider hidden />
    </div>

    /*<Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Footer Header' />
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                  <p>This is the bottom<Icon hand outline down /></p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
    </Segment>*/
);

export default Footer;

