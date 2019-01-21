/**
 * @file Des callbacks qui sélectionnent un sous-ensemble de groupes. IN PROGRESS la doc aussi, ça se voit ^^
 * @author akka vodol
 */

//hawkspar->akka grosses redondance avec le travail fait dans ldap/users.js, classe Open.
// Pas envisageable de redoubler le LDAP sur une BDD extérieure

/**
 * @summary Renvoie une liste des id de tous les groupes visibles par l'utilisateur
 * @desc Cette fonction génère un callback qui créé une table contenant les uid de tous les groupes visibles
 * @arg {Object} user - Objet contenant un attribut `uid` de type `string`. 
 * User représente l'utilisateur qui a effectué la requête. 
 * @return {Promise(Callback)} callback contruisant une requête knex pour une table de tous les id visibles.
 * @rights user
 */
export async function visibleGroups(user){
    let group_ids = await user.ldap_access.listGroups(user.uid);
    return function (global_query_builder){
        if (typeof group_ids == "undefined")
            throw "invalid user";
        var membered_groups = qb => qb.select('uid').from('simple_groups').whereIn('uid', group_ids.concat(['kes']));
        var directly_visible_simple_groups = qb =>  qb.with('membered_groups', membered_groups)
            .select('simple_groups.uid').from('simple_groups').distinct()
            .innerJoin('membered_groups',
                function () {
                    this.on('simple_groups.uid', '=', 'membered_groups.uid')
                        .orOn('simple_groups.parent_uid', '=', 'membered_groups.uid');
                }
            );
        return directly_visible_simple_groups(global_query_builder);
    };
}

export async function groupsWithMember(user){
    return null;
}

export async function groupsWithSpeaker(user){
    return function (query_builder){
        return groupsWithAdmin(user);
    };
}

export async function groupsWithAdmin(user){
    return function (query_builder){
        return ["kes"];
    };
}


// Give a user, get the messages linked to that user

export async function visibleAnnouncements(user){
    return query_builder => {
        return query_builder;
    };
}

export async function visibleEvents(user){
    return query_builder => {
        return query_builder;
    };
}

export async function messageHosts(user, messageID){
    return function(query_builder){
        return query_builder.select({uid : 'group'}).from('group_message_relationships')
            .where('message', messageID).where('status', 'host');
    };
}

/**
 * @summary Renvoie un callback qui génère tous les membres d'un meta-groupe.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} metaGroupUID - Identifiant unique du groupe.
 * @return {Promise(callback(groups))} a callback to build a query for the members of a group
 * It doesn't need to be a promise, but I figure having all of my functions return promises is 
 * easier than keeping track of which functions do and do not return promises.
 * @author akka vodol 
 * @rights member(metaGroupUID)
 */
export async function metaGroupMembers(user, metaGroupUID){
    return function(query_builder){
        return query_builder.distinct().select().from('groups')
            .innerJoin('meta_group_membership', 'groups.uid', 'meta_group_membership.member_uid')
            .where('meta_group_membership.union_uid', '=', metaGroupUID);
    };
}

/**
 * @summary Renvoie un callback qui génère tous les membres admin d'un meta-groupe.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} metaGroupUID - Identifiant unique du groupe.
 * @return {Promise(callback)} a callback to build a query for the admin members of a group
 * @author akka vodol 
 * @rights member(metaGroupUID)
 */
export async function metaGroupAdminMembers(user, metaGroupUID){
    return function(query_builder){
        return query_builder.distinct().select().from('groups')
            .innerJoin('meta_group_membership', 'groups.uid', 'meta_group_membership.member_uid')
            .where('meta_group_membership.union_uid', '=', metaGroupUID)
            .where('meta_group_membership.status', '=', 'admin');
    };
}

/**
 * @summary Renvoie un callback de tous les messages reçus par le groupe
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} groupUID - Identifiant du groupe.
 * @return {Promise(callback)} a callback to build a query for the admin members of a group
 * @author akka vodol 
 * @rights admin(groupUID)
 */
export async function recievedMessages(user, groupUID){
    return function(qb){
        return qb.column({id : 'message'}).select().from('group_message_relationships').where('group', groupUID).where('status', 'receive');
    };
}

export async function callbackIntersection(callbackList){
    return function(query_builder){
        let cb = callbackList.pop();
        if(callbackList){
            let intersection = callbackIntersection(callbackList);
            return function(query_builder){
                return query_builder.with('callback_set', cb)
                    .with('intersection', intersection)
                    .select('intersection.uid').from('intersection')
                    .innerJoin('callback_set', function(){
                        this.on('callback_set.uid', '=', 'intersection.uid');
                    });
            };
        }else{
            return cb;
        }
    };
}

export async function callbackUnion(callbackList){
    return null;
}