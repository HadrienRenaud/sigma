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

// les import 'apollo-*' pour utiliser apollo-graphql (une implementation de graphql en javascript)
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

const GRAPHQL_API_URL_LOCAL = "http://localhost:3000/graphql";
const GRAPHQL_API_URL = "http://129.104.201.10:3000/graphql";

const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL,
    credentials: 'include'
});

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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});



class App extends React.Component {

    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Route path="/" component={Main} />
                    {/*inclusive path matching*/}
                </BrowserRouter>
            </ApolloProvider>
        );

    }
}

import '../semantic/dist/semantic.min.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

ReactDOM.render(<App />, document.getElementById('app'));
