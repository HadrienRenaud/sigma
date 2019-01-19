/**
 * @file Short-list de tous les messages de tous les channels (les plus récents, disons). + fonction recherche de messages.
 *      TODO: Comme on l'aura remarqué, ce n'est pas ce que fait le fichier, pour l'instant (2018-10-20)... il faut le modifier/mettre à jour !
 * @author kadabra
 */
import React from 'react';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import {Message} from "semantic-ui-react";


/**
 * @constant Requête GraphQL
*/
const LIST_MESSAGES = gql`
    query myQuery { # no arguments
        # listMessages: [Messages]
        listMessages {
            id,
            origin,
            date,
            title,
            nbComments
            #extract some fields from object Messages
            #choose fields which will be displayed on this page
            #such as origin, title, nb of comments...
        }
        # une deuxième Query si on a envie
        #popularity( 
        #    color: $color
        #){
        #    localPop
        #    worldPop
        #}
    }
`;

class ListMessages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Query query={LIST_MESSAGES}
                    variables={{
                        color: this.props.color,
                        quality: this.props.color

                    }}
                //fetchPolicy='cache-first' //choose cache behaviour. defaults to "cache-first"
                >
                    {({ loading, error, data }) => {
                        if (loading)
                            return <div>Chargement, patientez SVP...</div>;
                        else if (error)
                            return <div>Erreur de chargement graphQL.</div>;

                        const { listMessages } = data; //extracts the actual data from object 'data'

                        return (
                            <div>
                                <p>blablabla...</p>
                                {listMessages.map(res => {
                                    //of type [Message], so we must use 'map' to produce multiple elements 
                                    //(one for each value returned by listMessages)
                                    //it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
                                    return <Message key={res} message={res} />;
                                })}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default ListMessages;
