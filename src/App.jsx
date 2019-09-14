/**
 * @file fichier racine du build de webpack. Wrap le Main.jsx avec ce qu'il faut pour pouvoir utiliser graphql
 * (apollo-client et les package associes).
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Main from './main/Main.jsx';
// import les css de semantic-ui-react et d'autres css utilises
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
// les import 'apollo-*' pour utiliser apollo-graphql (une implementation de graphql en javascript)
import {HttpLink} from 'apollo-link-http';
import {defaultDataIdFromObject, InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';

import {graphqlApiUrl} from './config.jsx';

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
            case 'MetaGroup':
            case 'SimpleGroup':
            case 'Group':
                return `Group:${object.gid}`; // use `Group` prefix  and `uid` as the primary key
            case 'User':
                return `User:${object.uid}`;
            case 'PublicPost':
            case 'PrivatePost':
            case 'Message':
                return `Message:${object.mid}`;
            case `Event`:
                return `Event:${object.eid}`;
            case 'UserJoinGroup':
            case 'GroupJoinMetagroup':
            case 'GroupCoauthorEvent':
            case 'Request':
                return `Request:${object.rid}`;
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
