import React from 'react';
import _ from 'lodash'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Accordion, Button, Segment, Icon, Component } from 'semantic-ui-react'

const PanelsEvents = _.times(4, (i) => ({
    title: (`Event #${i+1}`),
    content: (
        <div>
            <p>
                Cet évènement est trop cool. Viens ! Rejoins nous !
            </p>
            <div style={{textAlign:'center'}}>
                <Link to={"/event/"+i}><Button centered>
                    Voir
                </Button></Link>
            </div>
        </div>
    ),
}))


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

)

class GroupPanel extends React.Component {
    constructor() {
        super();
    }

    render() { return (
        <Link to="/group/1"><Button>Groupe</Button></Link>
    );}
}

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
)

const LeftBar = () => (
    <div>
        <Link to="/">
            <button className="ui basic button">Acceuil</button>
        </Link>

        <div className="ui divider"></div>
        <PinnedEvents/>
        <PinnedGroups/>
    </div>
)

export default LeftBar;