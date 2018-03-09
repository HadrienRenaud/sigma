import React from 'react';
import {Route, Switch, Link, } from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import LeftBar from './LeftBar.jsx';
import Center from './Center.jsx';
import RightBar from './RightBar.jsx';

import Background from '../../assets/sigma_bg.jpg';

// inline styling to render a background image.
// apparently it is better to use CSS classes but it would imply manipulating webpack
// https://reactjs.org/docs/faq-styling.html
const divStyle = {
    backgroundColor: 'blue',
    backgroundImage: `url(${Background})`
};

const Body = () => (
    <div style={ divStyle }>
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
    </div>
);

export default Body;
