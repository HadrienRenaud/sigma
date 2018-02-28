import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './main/Main.jsx';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink(),
    cache: new InMemoryCache(),
});

const AppProt = () => (
    <Router>
        <Route path="/" component={Main} />
    </Router>
);

class App extends React.Component {

    render() {
        return (<ApolloProvider client={client}>
            <AppProt />
        </ApolloProvider>);

    }    
}

import '../semantic/dist/semantic.min.css';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

render(<App />, document.getElementById('app'));
