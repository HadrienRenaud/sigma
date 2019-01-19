import { HttpLink } from 'apollo-link-http';

const GRAPHQL_API_URL = "http://localhost:3000/graphql";

export default new HttpLink({
    uri: GRAPHQL_API_URL
});