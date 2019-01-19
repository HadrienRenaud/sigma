import React from 'react';

import { Container } from 'semantic-ui-react';

import ListMembers from '../../member/ListMembers.jsx';

const GroupMembers = ({match}) => (
    <Container>
        <ListMembers/>
    </Container>
);

export default GroupMembers;