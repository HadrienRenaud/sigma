/**
 * @file Liste et description brève de chaque channel.
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

import ChannelCard from '../../cards/ChannelCard.jsx';

const LIST_CHANNELS = gql`
    query LIST_CHANNELS {
        listChannels {
          id,
          name,
          description
        }
    }
`;

class ListChannels extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            
            <div>
                <Header>List Channels</Header>
                <p>List and short description of all channels (TODO)</p>


                <Query query={LIST_CHANNELS}>
                    { ({ loading, error, data }) => {
                        if (loading)
                            return <div>Chargement, patientez SVP...</div>;
                        else if (error)
                            return <div>Erreur de chargement graphQL.</div>;

                        const { listChannels } = data; //extracts the actual data from object 'data'
                        //TODO: sort listChannels (by popularity? by user's preference?)

                        return (
                            <div>
                                { listChannels.map(res => {
                                    return <ChannelCard key={res} channelData={res} />;
                                }) }
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default ListChannels;
