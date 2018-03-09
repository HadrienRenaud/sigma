import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import LeftBar from './LeftBar.jsx';
import Center from './Center.jsx';
import RightBar from './RightBar.jsx';

const Body = () => (
    <Grid container>
        <Grid.Column width={3}> 
            <LeftBar/>
        </Grid.Column>

        <Grid.Column width={9}>
            <Center/>
        </Grid.Column>
        
        {/*<Grid.Column width={3}>
            <RightBar/>
</Grid.Column>*/}
    </Grid>
);

export default Body;