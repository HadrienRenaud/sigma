/**
 * @file fichier racine du build de webpack. Wrap le Main.jsx avec ce qu'il faut pour pouvoir utiliser graphql
 * (apollo-client et les package associes).
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './main/Main.jsx';


// import les css de semantic-ui-react et d'autres css utilises
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

// les import 'apollo-*' pour utiliser apollo-graphql (une implementation de graphql en javascript)
import {HttpLink} from 'apollo-link-http';
// import {setContext} from 'apollo-link-context';
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {graphqlApiUrl} from './config.jsx';
/**
 * Fetch info on interfaces and unions in our backend API
 * or else Apollo client will complain about fragments
 */
import apiSchemaGetter from './getSchemaInfo';

apiSchemaGetter(graphqlApiUrl);

import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';

const introspectionQueryResultData = JSON.parse(localStorage.getItem('fragmentTypes'));

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const httpLink = new HttpLink({
    uri: graphqlApiUrl,
    credentials: 'include'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        dataIdFromObject: object => {
            // https://www.apollographql.com/docs/react/advanced/caching.html#normalization 
            // dit a apollo-cache-inmemory que pour Group et User, la cle primaire est "uid" et pas "id" ni "_id" (par defaut)
            switch (object.__typename) {
            case 'Group':
                return `Group:${object.uid}`; // use `Group` prefix  and `uid` as the primary key
            case 'User':
                return `User:${object.uid}`;
            case `Announcement`:
                return `Announcement:${object.mid}`;
            case `Event`:
                return `Event:${object.mid}`;
            case `Question`:
                return `Question:${object.mid}`;
            case `PrivatePost`:
                return `PrivatePost:${object.mid}`;
            case `Answer`:
                return `Answer:${object.mid}`;
            default:
                return defaultDataIdFromObject(object); // fall back to default handling
            }
        },
        fragmentMatcher
    })
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Main onLogOut={client.clearStore}/>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
