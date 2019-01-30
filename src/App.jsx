/**
 * @file fichier racine du build de webpack. Wrappe l'application avec ce qu'il faut pour 
 *      pouvoir utiliser graphql (apollo-client et les package associes).
 */

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import {ApolloClient} from 'apollo-client';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import ErrorBoundary from "./errors/BoundaryError.jsx";
import httpLinkToGraphQL from './graphql/http-link.js';
import Layout from "./Layout.jsx";
//import { setContext } from 'apollo-link-context';

// const GRAPHQL_API_URL = "http://localhost:3000/graphql";
// const GRAPHQL_API_URL = "http://129.104.201.10:3000/graphql";

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
            // dit a apollo-cache-inmemory que pour Group, la cle primaire est "gid" et pas "id" ni "_id" (par defaut) (idem pour User et Message)
            switch (object.__typename) {
            case 'Group': return `Group:${object.gid}`; // use `Group` prefix  and `gid` as the primary key
            case 'MetaGroup': return `MetaGroup:${object.gid}`;
            case 'SimpleGroup': return `SimpleGroup:${object.gid}`;
            case 'User': return `User:${object.uid}`;
            case 'Message': return `Message:${object.mid}`;
            case 'Announcement': return `Announcement:${object.mid}`;
            case 'Event': return `Event:${object.mid}`;
            case 'Question': return `Question:${object.mid}`;
            case 'Answer': return `Answer:${object.mid}`;
            case 'PrivatePost': return `PrivatePost:${object.mid}`;
            case 'Request': return `Request:${object.rid}`;
            case 'UserJoinGroup': return `UserJoinGroup:${object.rid}`;
            case 'GroupJoinMetagroup': return `GroupJoinMetagroup:${object.rid}`;
            case 'GroupCoauthorEvent': return `GroupCoauthorEvent:${object.rid}`;
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
