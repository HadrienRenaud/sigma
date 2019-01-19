/**
 * @file Implémentation des requêtes GraphQL.
 * @author akka vodol
 */

import MessageResolvers from './resolvers/messages';
import GroupResolvers from './resolvers/groups';

export const resolvers = {

    Request : {
        __resolveType : function(obj){
            return obj.type;
        }
    },

    ...MessageResolvers,

    ...GroupResolvers,
};
