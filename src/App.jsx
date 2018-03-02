import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './main/Main.jsx';

// try to have a favicon at all cost~!
// https://github.com/coryhouse/react-slingshot/issues/128#issuecomment-216363426
//import icon from  './assets/favicon.ico';
import path from 'path';
import Favicon from 'react-favicon';

import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

const GRAPHQL_API_URL = "http://localhost:3000/graphql";

const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL,
    credentials: 'include'
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

class App extends React.Component {

    render() {
        console.log("coucou from console in App.jsx");
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Main/>
                </BrowserRouter>
            </ApolloProvider>
        );

    }
}

import '../semantic/dist/semantic.min.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

ReactDOM.render(<App />, document.getElementById('app'));
