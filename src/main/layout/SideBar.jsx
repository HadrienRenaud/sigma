/**
 * @file Barre d'information et d'acces rapide sur le cote de la page.
 * Pour le mettre a gauche ou a droite, c'est Body.jsx qu'il faut modifier.
 * @author manifold
 */

import React from 'react';
import { Segment } from 'semantic-ui-react';

const MySideBar = () => (
    <div>
        <Segment vertical>
            CC
        </Segment>
        <Segment vertical>
            CC 2
        </Segment>
        <Segment vertical>
            CC 2
        </Segment>
        <Segment vertical>
            CC 3
        </Segment>
        <Segment vertical>
            CC 4
        </Segment>
        <Segment vertical>
            CC 5
        </Segment>
    </div>
);

export default MySideBar;
