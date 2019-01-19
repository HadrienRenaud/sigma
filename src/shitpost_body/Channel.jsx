/**
 * @file Description and posts of the channel specified in the URL
 * 
 * @author kadabra
*/
import React from 'react';

import { Header } from "semantic-ui-react";


class Channel extends React.Component {

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
Channel.propTypes = {
    myProp: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};
*/

export default Channel;
