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

import httpLinkToGraphQL from './graphql/http-link.js'

import Layout from "./Layout.jsx";



const client = new ApolloClient({
    // to customize, follow: https://www.apollographql.com/docs/link/links/http.html
    // possibly useful: https://www.apollographql.com/docs/link/links/context.html
    link: httpLinkToGraphQL,
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>{/*pour dire où envoyer les requêtes GraphQL utilisées dedans*/}
            <BrowserRouter>{/*pour définir "l'environnement" des Component de react-router-dom utilisés dedans*/}
                <Layout />
            </BrowserRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
