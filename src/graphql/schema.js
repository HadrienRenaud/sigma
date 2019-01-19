/**
 * @file Ce fichier génère le schéma GraphQL. C'est ici que les requêtes GraphQl sont résolues.
 * @author akka vodol
*/

import actionDefs from './typeDefs/actions.graphql';
import objectDefs from './typeDefs/objects.graphql';
import {resolvers} from './resolvers.ts';
import {makeExecutableSchema} from "graphql-tools";

const typeDefs = actionDefs.concat(objectDefs);

const schema = {
    typeDefs,
    resolvers,
    logger: {log: e => console.log(e)},
};

export default new makeExecutableSchema(schema);