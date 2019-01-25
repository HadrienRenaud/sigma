/**
 * @file MWE (minimal working example) de Component utilisant une requête GraphQL. 
 * L'auteur estime qu'il est lisible et compréhensible tel quel, et donc facilement copiable-modifiable.
 * https://www.apollographql.com/docs/react/essentials/queries.html [mai 2018]
 * Beaucoup de tutos utilisent encore l'ancienne syntaxe avec le HOC gql (Higher Order Component) [mai 2018]
 * 
 * @author kadabra
 * 
 * Dans cet exemple, supposons qu'il y a dans le schema 
 *  - une Query 'searchPaintCatalog' qui renvoie une [ID!] des numeros de produits qui correspondent aux criteres de recherche (color et quality)
 *  - une Query 'popularity' qui renvoie un type Popularity ayant deux sous-champs scalaires (Int en l'occurrence).
*/
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/**
 * @constant Requête GraphQL
*/
const GET_PAINT = gql`
    query GETPAINTQUERY(
         # ce nom ("GETPAINTQUERY") n'est pas indispensable, mais peut servir pour le debuggage par exemple
        $color: String, # arguments de la Query
        $quality: String
    ) {
        # la Query proprement dite
        # une première Query, qui renvoie un [ID]
        searchPaintCatalog( 
            color: $color,
            quality: $quality
        ),
        # une deuxième Query, qui renvoie un objet donc il faut expliciter les sous-champs
        popularity( 
            color: $color
        ){
            localPop
            worldPop
        }
    }
`;

class PaintExampleClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Query query={GET_PAINT}
                variables={{
                    color: this.props.color,
                    quality: this.props.color

                }}
                //fetchPolicy='cache-first' //choose cache behaviour. defaults to "cache-first"
            >
                {({ loading, error, data }) => {
                    if (loading)
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error)
                        return <div>Erreur de chargement graphQL.</div>;

                    const { searchPaintCatalog, popularity } = data; //extracts the actual data from object 'data'

                    return (
                        <div>
                            <p>La couleur que vous avez recherché, le {this.props.color}, a pour popularité {popularity.localPop} dans votre région et {popularity.worldPop} dans le monde.</p>
                            <p>Voici les pots de peinture correspondant à votre requête :</p>
                            {searchPaintCatalog.map(res => {
                                //since searchPaintCatalog is of type [ID], we must use
                                //'map' to produce multiple elements (PaintCard components in this case),
                                //one for each value returned by searchPaintCatalog
                                //it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
                                return <PaintCard key={res} uid={res} />;
                            })}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default PaintExampleClass;