/**
 * @file description TODO
 *
 * @author kadabra
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Header, List, Segment} from "semantic-ui-react";


class MessageCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Segment compact>
                    <Header as='h2'>Message Card.</Header>
                    <List>
                        <List.item>
                            Message id: {this.props.message.id}
                        </List.item>
                        <List.item>
                            Message origin: {this.props.message.origin}
                        </List.item>
                        <List.item>
                            Message publish date: {this.props.message.date}
                        </List.item>
                        <List.item>
                            Message title: {this.props.message.title}
                        </List.item>
                        <List.item>
                            Message nb of Comments: {this.props.message.nbComments}
                        </List.item>
                    </List>
                </Segment>
            </div>
        );
    }
}

MessageCard.propTypes = {
    message: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};

export default MessageCard;
