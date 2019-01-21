/**
 * @file Implémentation des requêtes GraphQL.
 * @author akka vodol
*/
import { assertBinaryExpression } from 'babel-types'; //hawkspar->akka ASKIP useless
// import knex from '../../db/knex_router';

// import '../config_passport';

// import * as connectors from './connectors/connectors';
// import * as authentifiers from './connectors/authentifiers';
import MessageResolvers from './resolvers/messages';
import GroupResolvers from './resolvers/groups';


export const resolvers = {
    // @rights user
    Request : {
        __resolveType : function(obj){
            return obj.type;
        }
    },

    ...MessageResolvers,

    ...GroupResolvers,
};
