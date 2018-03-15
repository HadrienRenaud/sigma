import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Grid, Menu, Accordion, Button, Segment, Icon, Component, Sticky, Container } from 'semantic-ui-react';
import GroupPanel from '../group/GroupPanel.jsx';

const PanelsEvents = _.times(4, (i) => ({
    title: (`Event #${i+1}`),
    content: (
        <div>
            <p style={{textAlign:'center'}}>
                Cet évènement est trop cool. Viens ! Rejoins nous !
            </p>
            <div style={{textAlign:'center'}}>
                <Link to={"/event/"+i}>
                    <Button>Voir</Button>
                </Link>
            </div>
        </div>
    ),
}));


const PinnedEvents = () => (
    <Segment.Group>
        <Segment color="teal" inverted>
            <p>Évenements</p>
        </Segment>
        <Accordion panels={PanelsEvents} styled>
        </Accordion>
        <Segment textAlign="center">
            <Link to="/event/create"><Button>
            Créer
            </Button></Link>
        </Segment>
    </Segment.Group>

);

const PinnedGroups = () => (
    <Segment.Group>
        <Segment color="teal" inverted>
            <p>Groupes</p>
        </Segment>
        <Button.Group basic fluid vertical>
            <GroupPanel/>
            <GroupPanel/>
            <GroupPanel/>
        </Button.Group>
    </Segment.Group>
);

const LeftBar = () => (

    <div>
        {/*}
        <Grid.Column>
            <Menu attached tabular widths={3}>
                <Menu.Item active as='a'>Active Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
            </Menu>
            <Segment attached>Segment</Segment>
            <Menu attached compact widths={3}>
                <Menu.Item active as='a'>Active Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
                <Menu.Item as='a'>Item</Menu.Item>
            </Menu>
            <Segment attached='bottom'>Segment</Segment>
        </Grid.Column>
        */}
    
    <Container>
        <PinnedEvents/>
        <PinnedGroups/>
    </Container>
    
    </div>
);



export default LeftBar;