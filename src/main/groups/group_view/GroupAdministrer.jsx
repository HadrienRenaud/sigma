import React from 'react';
import { Route, Link } from 'react-router-dom';

import {Button, Segment, Icon, Divider, Card, Form, Header, Search} from 'semantic-ui-react';

const GroupAdministrer = ({ match }) => (
    <div>

        <Segment basic>
            <Header as="h3" content="Général"/>

            <Form>
                <Form.Group inline>
                <Form.Input label="Nom" placeholder="The beautiful name you want to give your group" width={3}/>
                <Button>Edit</Button>
                </Form.Group>

                <Divider hidden/>

                <Form.TextArea label="Description" placeholder="The description of your group" />
                <Button>Edit</Button>

                <Divider hidden/>

                <Header as="h4"> Picture</Header>
            </Form>
        </Segment>

        <Segment basic>
            <Header as="h3" content="Ajouter des membres"/>

            <Search fluid/>
        </Segment>

    </div>
);

export default GroupAdministrer;