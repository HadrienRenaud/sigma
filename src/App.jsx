/**
 * @file fichier racine du build de webpack. Wrappe l'application avec ce qu'il faut pour 
 *      pouvoir utiliser graphql (apollo-client et les package associes).
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
//import { setContext } from 'apollo-link-context';

import ErrorBoundary from "./errors/BoundaryError.jsx";
import httpLinkToGraphQL from './graphql/http-link.js'

// const GRAPHQL_API_URL = "http://localhost:3000/graphql";
// const GRAPHQL_API_URL = "http://129.104.201.10:3000/graphql";

import Layout from "./Layout.jsx";

/*
 * Seulement si on active es fragment matcher
 * Pas trop compatible avec le mock
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
const introspectionQueryResultData = JSON.parse(localStorage.getItem('fragmentTypes'));

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});
*/

const client = new ApolloClient({
    // to customize, follow: https://www.apollographql.com/docs/link/links/http.html
    // possibly useful: https://www.apollographql.com/docs/link/links/context.html
    link: httpLinkToGraphQL,
    cache: new InMemoryCache({
        dataIdFromObject: object => { 
            // https://www.apollographql.com/docs/react/advanced/caching.html#normalization 
            // dit a apollo-cache-inmemory que pour Group et User, la cle primaire est "uid" et pas "id" ni "_id" (par defaut)
            switch (object.__typename) {
                case 'Group': return `Group:${object.uid}`; // use `Group` prefix  and `uid` as the primary key
                case 'User': return `User:${object.uid}`;
                default: return defaultDataIdFromObject(object); // fall back to default handling
            }
        },
        // fragmentMatcher
    })
});

const App = () => {
    return (
        <ApolloProvider client={client}>{/*pour dire où envoyer les requêtes GraphQL utilisées dedans*/}
            <BrowserRouter>{/*pour définir "l'environnement" des Component de react-router-dom utilisés dedans*/}
                <ErrorBoundary>
                <Layout />
                </ErrorBoundary>
            </BrowserRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
