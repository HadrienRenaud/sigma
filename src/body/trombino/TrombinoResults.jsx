/**
 * @file résultat de la recherche sur le TOL. Ce component ne gère que les uid des Users matchés,
 * la Query graphql des données à proprement parler sont faites dans UserCard (auquel on passe l'uid en props)
 * @author manifold
 */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import UserCard from '../../widgets/UserCard.jsx';

/** 
 * @constant Requête GraphQL...
 * [13/04/18] 
 * actuellement ca marche pas, il faut changer le schema pour que searchTOL renvoie un User au lieu de [ID] ou [String]
 * ca ne donnera pas lieu a des problemes d'autoristion puisque [ID] + UserCard fait exactement la meme chose,
 * et que de toute facon on gere les autorisations ds les resolvers.
 * 
*/
const GET_TROMBINO = gql`
    query trombinoQuery(
        $givenName: String,
        $lastName: String,
        $nickname: String,
        $groups: String,
        $promotion: String,
    ) {
        #returns [User] array of JS objects with only the 'uid' field, representing User uid's
        searchTOL(givenName: $givenName, 
            lastName: $lastName,
            nickname: $nickname,
            groups: $groups,
            promotion: $promotion)
    }
`;

/**
 * @class Affiche les résultats tu trombinoscope
 */
class TrombinoResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(newProps, prevState) {
        /*
        getDerivedStateFromProps is invoked after a component is instantiated as well as when it receives new props. 
        It should return an object to update state, or null to indicate that the new props do not require any state updates.
        https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
        */
        console.log(newProps);
        return null;
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
                {({ loading, error, data }) => {
                    if (loading) return <div>Chargement...</div>;
                    else if (error) {
                        console.log(error.name);
                        console.log(error.message);
                        //console.log(error.graphQLErrors);
                        //console.log(error.networkError);
                        return <div>Erreur.</div>;
                    }
                    const { searchTOL } = data; //extracts the actual data from object 'data'
                    
                    return (
                        <div>
                            {searchTOL.map(res => {
                                // searchTOL's GraphQL type is [User], so it resolves to a JavaScript array 
                                // one for each value returned by searchTOL it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
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
