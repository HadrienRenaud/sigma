import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './main/Main.jsx';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let GRAPHQL_API_URL = "http://localhost:3000/graphql";

const client = new ApolloClient({
    link: new HttpLink(GRAPHQL_API_URL),
    cache: new InMemoryCache(),
});

class App extends React.Component {

    render() {
        return (<ApolloProvider client={client}>
            <Router>
                <Route path="/" component={Main} />
            </Router>
        </ApolloProvider>);

    }    
}

import '../semantic/dist/semantic.min.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

render(<App />, document.getElementById('app'));
