import {HttpLink} from "apollo-link-http";
import {defaultDataIdFromObject, InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {ApolloClient} from "apollo-client";
import {GRAPHQL_URL} from "../../constants/config";
import introspectionQueryResultData from "./fragmentTypes.json";

// see https://www.apollographql.com/docs/react/advanced/fragments/#fragments-on-unions-and-interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        dataIdFromObject: (object) => {
            // https://www.apollographql.com/docs/react/advanced/caching.html#normalization
            // dit a apollo-cache-inmemory que pour Group et User, la cle primaire est "uid" et pas "id" ni "_id" (par defaut)
            switch (object.__typename) {
                case 'MetaGroup':
                case 'SimpleGroup':
                case 'Group':
                    // @ts-ignore
                    return `Group:${object.gid}`; // use `Group` prefix  and `uid` as the primary key
                case 'User':
                    // @ts-ignore
                    return `User:${object.uid}`;
                case 'PublicPost':
                case 'PrivatePost':
                case 'Message':
                    // @ts-ignore
                    return `Message:${object.mid}`;
                case `Event`:
                    // @ts-ignore
                    return `Event:${object.eid}`;
                case 'UserJoinGroup':
                case 'GroupJoinMetagroup':
                case 'GroupCoauthorEvent':
                case 'Request':
                    // @ts-ignore
                    return `Request:${object.rid}`;
                default:
                    return defaultDataIdFromObject(object); // fall back to default handling
            }
        },
        fragmentMatcher
    }),
    defaultOptions: {
        query: {
            errorPolicy: "all"
        }
    }
});

export default client;
