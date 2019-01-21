/**
 * @file Output (card) of this message and its comments, and other related stuff.
 *      A terme, il faudra mettre option pour commenter directement d'ici.
 * 
 * @author kadabra
*/
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Container, Image, Menu, Segment, Header } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

const GET_MESSAGE = gql`
    query GET_MESSAGE (
        $id: ID
    ) {
        message (
            id: $id
        ){
            id,
            date,
            author,
            channel {
                id,
                name
            }
            content,
            nbComments,
            comments {
                id
            }
        }
    }
`;

class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>Message #{this.props.id}</Header>
                <p>Content, context and comments of the specified message (be it post or comment) (TODO))</p>

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

                        const { message } = data; //extracts the actual data from object 'data'

                        return (

                            <Segment compact>
                                <Header>Message #{this.props.id}</Header>
                                <List>
                                    {/* would also be nice to have the date of latest comment, among others */}
                                    <List.item>
                                        Message id: {message.id}
                                    </List.item>
                                    <List.item>
                                        Message author: {message.author}
                                    </List.item>
                                    <List.item>
                                        Message publish date: {message.date}
                                    </List.item>
                                    <List.item>
                                        Message nb of Comments: {message.nbComments}
                                    </List.item>
                                    <List.item>
                                        Content: {message.content}
                                    </List.item>
                                    <List.item>
                                        <p>Comments:</p>
                                        <p>TODO: do a map to unroll the comments</p>
                                    </List.item>
                                </List>
                            </Segment>


                        );
                    }}
                </Query>

            </div>
        );
    }
}

Message.propTypes = {
    id: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};

export default Message;
