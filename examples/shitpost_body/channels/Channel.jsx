/**
 * @file Description and posts of the channel specified in the URL
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

/* TODO: the graphql schema would be more logical if we could do this. and it would be easier for the frontend developer too.
const GET_CHANNEL = gql`
    query GET_CHANNEL (
        $cid: ID
    ) {
        channel (
            cid: $cid
        ){
            id,
            name,
            description,
            posts {
                id,
                date,
                author,
                title,
                nbComments
            }
        }
    }
`;
*/

const GET_CHANNEL = gql`
    query GET_CHANNEL (
        $cid: ID
    ) {
        channel (
            cid: $cid
        ){
            id,
            name,
            description
        }
    }
`;

const LIST_POSTS = gql`
    query LIST_POSTS (
        $cid: ID
    ) {
        listPosts (
            cid: $cid
        ){
            id,
            date,
            author,
            title,
            nbComments
        }
    }
`;

class Channel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_CHANNEL}
                variables={{
                    cid: this.props.cid
                }}
            >
                {({ loading, error, data }) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <div>Erreur de chargement graphQL.</div>;

                    const { channelData } = data; //extracts the actual data from object 'data'

                    return (

                        <Segment.Group as={Container} text>
                            <Segment as={Header}>
                                Channel #{channelData.id}: {channelData.name}
                            </Segment>
                            <Segment>
                                {channelData.description}
                            </Segment>

                            <Segment>
                                <Header as="h4">Activité récente :</Header>

                                <Query query={LIST_POSTS}
                                    variables={{
                                        cid: this.props.cid
                                    }}
                                >
                                    {({ loading, error, data }) => {
                                        if (loading)
                                            return <div>Chargement, patientez SVP...</div>;
                                        else if (error)
                                            return <div>Erreur de chargement graphQL.</div>;

                                        const { listPosts } = data; //extracts the actual data from object 'data'
                                        //TODO: sort listPosts by date if possible

                                        return (
                                            <div>
                                                {listPosts.map(res => {
                                                    return <MessageCard key={res} messageData={res} />;
                                                })}
                                            </div>
                                        );
                                    }}
                                </Query>


                            </Segment>
                        </Segment.Group>



                    );
                }}
            </Query>

        );
    }
}

Channel.propTypes = {
    cid: PropTypes.any.isRequired
    //https://www.npmjs.com/package/prop-types#usage
};


export default Channel;
