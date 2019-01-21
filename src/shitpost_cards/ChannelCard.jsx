/**
 * @file description TODO
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';



class ChannelCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment.Group compact as={Container} text>
                <Segment>
                    <Header>
                        Channel #{this.props.channelData.id}: {this.props.channelData.name}
                    </Header>
                    <NavLink to={"/channels/"+this.props.channelData.id}>visiter</NavLink>
                </Segment>
                <Segment>
                    {this.props.channelData.description}
                </Segment>
            </Segment.Group>

        );
    }
}


ChannelCard.propTypes = {
    //channelData: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    channelData: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
    //https://www.npmjs.com/package/prop-types#usage
};

export default ChannelCard;
