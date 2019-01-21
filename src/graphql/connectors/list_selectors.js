import knex from '../../../db/knex_router';
import * as selectors from './selectors';

/**
 * @summary Renvoie le type d'un groupe.
 * @function
 * @desc Parcours les BDD pour savoir dans laquelle se trouve le groupe ayant l'UID donné. 
 * Cette opération nécéssite un parcours de base de donnée, et il est préférable de ne pas 
 * sans servir si on a un autre moyend de connaitre le typed d'un groupe
 * (Par exemple, si on dispose d'un retour de BDD pour ce groupe. Le champ 'type' indique alors son type.)
 * @arg {Object} user - Objet contenant un attribut `uid` de type `string`. 
 * User représente l'utilisateur qui a effectué la requête. 
 * @arg {Object} groupUID - L'id du groupe dont on veut connaître le type.
 * @return {Promise(String)} Un string représentant le type du groupe.
 * Peut être "SimpleGroup" ou "MetaGroup". Renvoie `Undefined` si le groupe n'existe pas
 * @rights super
 */
export const getGroupType = (user, groupUID) => {
    return knex('simple_groups').select('uid').where('uid', groupUID).then( sg_res => {
        if(sg_res)
            return "SimpleGroup";
        return knex('meta_groups').select('uid').where('uid', groupUID).then(mg_res => {
            if(mg_res)
                return "MetaGroup";
            return undefined;
        });
    });
};

/**
 * @summary renvoie tous les groupes sur lesquels un utilisateur a des droits de supervision
 * @desc Cette fonction effectue des requêtes knex. Elle parcoure recursivement l'arbre de parenté,
 * Et cela aurait été trop lourd de la faire renvoyer un callback définissant une requête.
 * @arg {Object} user - Objet contenant un attribut `uid` de type `string`. 
 * User représente l'utilisateur qui a effectué la requête. 
 * @return {Promise(array)} Une liste des uid de tous les groupes que user supervise.
 * @rights user
 */
export async function supervisedGroups(user){
    function difference(arr1, arr2){
        return arr1.filter( e => (arr2.indexOf(e) < 0));
    }
    async function recursive_explorer(visited_groups, start_groups){
        let child_simple_groups = await knex.select('uid').distinct().from('simple_groups')
            .whereIn('parent_uid', start_groups);
        let child_meta_groups = await knex.select('union_uid').as('uid').distinct()
            .from('meta_group_membership').where('status', 'admin')
            .whereIn('member_uid', child_simple_groups);
        let new_start_groups = difference(child_simple_groups.concat(child_meta_groups), visited_groups);
        let new_visited_groups = visited_groups.concat(new_start_groups);
        if(new_start_groups.length > 0)
            return recursive_explorer(new_visited_groups, new_start_groups);
        else
            return new_visited_groups;
        
    }
    let groups_with_admin = (await selectors.groupsWithAdmin(user))(knex);
    return recursive_explorer([], groups_with_admin);
}

/**
 * @summary Renvoie tous les utilisateurs ayant des droits d'administrateur sur un groupe.
 * @function
 * @desc Les utilisateurs qui ont un droit d'administrateur sur un groupe simple sont ses administrateurs 
 * et les utilisateurs ayant droit d'admin sur son parent.
 * Les utilisateurs ayant droit d'admin sur un meta-groupe sont les utilisateurs 
 * ayant droit d'admin sur un des groupes membres
 * @arg {String} uid - L'uid du groupe dont on veut les administrateurs. 
 * @return {Promise} Retour de requête knex. Promise qui renvera une liste 
 * de tous les utilisateurs ayant droit d'admin sur le groupe
 * rights member(groupUID)
 */
export async function usersWithAdminRights(user, groupUID){
    let group_type = await getGroupType(user, groupUID);
    if(group_type == "SimpleGroup"){
        let added_admins = await knex.select('user_uid').from('taken_rights').where('group_uid', groupUID);
        let admin_list = ["wilson.jallet", "louis.vanneau"]; // await listerAdministrateurs(user, groupUID);
        return admin_list.concat( added_admins.map( o => o.user_uid) );
    }else{
        let mg_members = await selectors.metaGroupAdminMembers(user, groupUID)(knex);
        let admin_users = [];
        while(mg_members){
            admin_users = admin_users.concat(await usersWithAdminRights(mg_members.pop()));
        }
        return admin_users;
    }
}
