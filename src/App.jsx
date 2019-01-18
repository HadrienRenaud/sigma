/**
 * @file fichier racine du build de webpack. Wrappe l'application avec ce qu'il faut pour 
 *      pouvoir utiliser graphql (apollo-client et les package associes).
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
//import { setContext } from 'apollo-link-context';

const GRAPHQL_API_URL = "http://localhost:3000/graphql";
//const GRAPHQL_API_URL = "http://129.104.201.10:3000/graphql";

import Layout from "./Layout.jsx";



const client = new ApolloClient({
    // to customize, follow: https://www.apollographql.com/docs/link/links/http.html
    // possibly useful: https://www.apollographql.com/docs/link/links/context.html
    link: createHttpLink({
        uri: GRAPHQL_API_URL
    }),
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
