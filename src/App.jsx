/**
 * @file fichier racine du build de webpack. Wrap le Main.jsx avec ce qu'il faut pour pouvoir utiliser graphql
 * (apollo-client et les package associes).
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './main/Main.jsx';

// try to have a favicon at all cost~!
// https://github.com/coryhouse/react-slingshot/issues/128#issuecomment-216363426
//import icon from  './assets/favicon.ico';
import path from 'path';
import Favicon from 'react-favicon';

// import les css de semantic-ui-react et d'autres css utilises
import '../semantic/dist/semantic.min.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

// les import 'apollo-*' pour utiliser apollo-graphql (une implementation de graphql en javascript)
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

const GRAPHQL_API_URL_LOCAL = "http://localhost:3000/graphql";
const GRAPHQL_API_URL = "http://129.104.201.10:3000/graphql";

/**
 * Fetch info on interfaces and unions in our backend API
 * or else Apollo client will complain about fragments
 */
import apiSchemaGetter from './getSchemaInfo';
apiSchemaGetter(GRAPHQL_API_URL_LOCAL);

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
const introspectionQueryResultData = JSON.parse(localStorage.getItem('fragmentTypes'));

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

/**
 * this code snippet taken from https://www.apollographql.com/docs/react/recipes/authentication.html
 * only applies to websites using Basic HTTP Authentication (https://en.wikipedia.org/wiki/Basic_access_authentication)
 * but we want to use cookies, because express-session, which we use in the back, supports cookies only anyway
 * although apparently using tokens (i.e. HTTP authentication) is actually secu and elegant in modern apps such as react-based apps
 * https://auth0.com/blog/cookies-vs-tokens-definitive-guide/
 */

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL_LOCAL
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
        fragmentMatcher
    })
});

const App = () =>
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </ApolloProvider>;

ReactDOM.render(<App />, document.getElementById('app'));
