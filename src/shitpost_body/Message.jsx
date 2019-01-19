/**
 * @file Output (card) of this message and its comments, and other related stuff.
 *      A terme, il faudra mettre option pour commenter directement d'ici.
 * 
 * @author kadabra
*/
import React from 'react';

import { Header } from "semantic-ui-react";


class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>Channel</Header>
                <p>Description and posts of the specified channel (TODO)</p>
            </div>
        );
    }
}

/*
Message.propTypes = {
    myProp: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};
*/

export default Message;
