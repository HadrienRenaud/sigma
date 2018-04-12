import React from 'react';
import {
    Form, Button, Input, Container, Divider,
    Grid, Header, Menu, Message, Segment, Table
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import UserCard from '../member/UserCard.jsx';

/** 
 * @constant Requête GraphQL...
*/
const GET_TROMBINO = gql`
    query trombinoQuery(
        $givenName: String,
        $lastName: String,
        $nickname: String,
        $groups: String,
        $promotion: String,
    ) {
        searchTOL(givenName: $givenName, 
            lastName: $lastName,
            nickname: $nickname,
            promotion: $promotion,
            groups: $groups) #returns [ID] of user uid's
    }
`;

/**
 * @class Affiche les résultats tu trombinoscope
 */
class TrombinoResults extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps, prevState) {
        /*
        getDerivedStateFromProps is invoked after a component is instantiated as well as when it receives new props. 
        It should return an object to update state, or null to indicate that the new props do not require any state updates.
        */
        console.log(newProps);
    }

    render() {

        return (
            <Query query={GET_TROMBINO}
                variables={{
                    givenName: this.props.params.givenName, 
                    lastName: this.props.params.lastName,
                    nickname: this.props.params.nickname,
                    groups: this.props.params.groups,
                    promotion: this.props.params.promo,
                }}
                fetchPolicy='cache-first' 
            >
                { ({ loading, error, data }) => {
                    if (loading) return <div>Chargement, patience SVP...</div>;
                    else if (error) return <div>Erreur.</div>;

                    const { searchTOL } = data; //extracts the actual data from object 'data'
                    
                    return (
                        <div>
                            {searchTOL.map(res => {
                                //since searchTOL is of type [String], we must use
                                //'map' to produce multiple UserCards (in this case), 
                                //one for each value returned by searchTOL
                                //it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
                                return <UserCard key={res} uid={res} />;
                            })}
                        </div>
                    );
                } }
            </Query>
        );
    }
}

export default TrombinoResults;
