import { HttpLink } from 'apollo-link-http';

const GRAPHQL_API_URL = "http://localhost:3000/graphql";

/**
 * Fetch info on interfaces and unions in our backend API
 * or else Apollo client will complain about fragments
 */
/* Disabled car pas trop compatible avec le mock
import apiSchemaGetter from './getSchemaInfo.js';
apiSchemaGetter(GRAPHQL_API_URL);
*/

export default new HttpLink({
    uri: GRAPHQL_API_URL
});