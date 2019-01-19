/**
 * @file Liste et description brève de chaque channel.
 * 
 * @author kadabra
*/
import React from 'react';

import { Header } from "semantic-ui-react";

/* (modèle)
const GET_PAINT = gql`
    query getAllChannels(
         # ce nom ("getAllChannels") n'est utile que pour le debuggage
        $color: String
        $quality: String
    ) {
        # la Query proprement dite
        # une première Query, qui renvoie un [ID]
        searchPaintCatalog( 
            color: $color,
            quality: $quality
        ),
        # une deuxième Query, qui renvoie un objet donc il faut expliciter les sous-champs
        popularity( 
            color: $color
        ){
            localPop
            worldPop
        }
    }
`;
*/

class ListChannels extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>List Channels</Header>
                <p>List and short description of all channels (TODO)</p>
            </div>
        );
    }
}

export default ListChannels;
