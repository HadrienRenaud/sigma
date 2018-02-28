import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const GET_ALLGROUPS = gql`
    query GroupQuery {
        allGroups {
            name
            id
            website
            school
        }
    }
`;

class MainWithoutData extends React.Component {

    componentDidMount() {
    }
    
    render() {
        const groupsToRender = this.props.groupQuery.allGroups;
        console.log(groupsToRender);

        return (
            <div>
                <Header />
                <p>Group data yeah !</p>
                <p>{JSON.stringify(groupsToRender,null,2)}</p>
                <Footer />
            </div>
        );
    }
}

export default graphql(GET_ALLGROUPS, {name: 'groupQuery'})(MainWithoutData);
