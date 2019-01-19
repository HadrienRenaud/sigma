/**
 * @file Write a new Post (React form, GraphQL Mutation etc etc)
 * 
 * @author kadabra
*/
import React from 'react';

import { Header } from "semantic-ui-react";


class WritePost extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header>Write Post</Header>
                <p>Write a new Post (React form, GraphQL Mutation etc etc) (TODO)</p>
            </div>
        );
    }
}

/*
WritePost.propTypes = {
    myProp: PropTypes.any.isRequired //requires that this Component be rendered with "myProp" as prop
    //https://www.npmjs.com/package/prop-types#usage
};
*/

export default WritePost;
