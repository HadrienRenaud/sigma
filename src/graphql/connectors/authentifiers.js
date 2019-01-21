/**
 * @file Fonctions d'authentification
 * @author akka vodol
 */

import knex from '../../../db/knex_router.js';
import * as connectors from './connectors.js';
import * as selectors from './selectors.js';
import * as list_selectors from './list_selectors.js';
import {Open as LDAPOpen, User as LDAPUser}  from '../../ldap/users';
import {Admin as LDAPAdmin, Supervisor as LDAPSupervisor} from '../../ldap/admins';

/**
 * @summary Place-holder permettant de concaténer utilisateur et permissions dans un seul objet
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.
 * @arg {Object} ldap_access - Représente les permissions de l'utilisateur en question.  
 * @return {Object} Prototype de la fonction contenant la concaténation des deux arguments.
 */
function User(user, ldap_access){ //hawkspar->akka ; ceci pourrait avantageusement être une classe
    this.anonymous = Boolean(user.anonymous),
    this.uid = user.uid,
    this.password = user.password,
    this.ldap_access = ldap_access;
}

/**
 * @summary Authentifie un utilisateur anonyme en appelant {@link User} et {@link LDAPOpen}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.  
 * * @return {Promise(Object)} Un objet user si l'utilisateur possède les droits indiqués, 
 * null sinon
 * @rights user
 */
export function anonymous(user){
    return new User(user, new LDAPOpen());
}

/**
 * @summary Authentifie un utilisateur comme viewer(groupUID) en appelant {@link User} et {@link LDAPUser}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.
 * * @return {Promise(Object)} Un objet user si l'utilisateur possède les droits indiqués, 
 * null sinon
 * @rights user
 */
export function loggedIn(user, groupUID){ //hawkspar: WTF ? Pq garder son groupUID ?
    return new User(user, new LDAPUser(user));
}

/**
 * @summary Authentifie un utilisateur comme viewer(groupUID)
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.
 * * @return {null}
 * @rights user
 */
export function viewer(user, groupUID){
    return null; // Du coup useless non ?
}

/**
 * @summary Authentifie un utilisateur anonyme en appelant {@link User} et {@link LDAPUser}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.  
 * * @return {Promise(Object)} Un objet user si l'utilisateur possède les droits indiqués, 
 * null sinon
 * @rights user
 */
export async function member(user, groupUID){
    let group_list = await selectors.groupsWithMember(user);
    let test = await knex.with('group_list', group_list).select().from('group_list').where('uid', groupUID);
    if(test[0])
        return new User(user, new LDAPUser(user));
    return await admin(user, groupUID);
}

/**
 * @summary Authentifie un utilisateur comme viewer(groupUID) en appelant {@link admin}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.  
 * * @return {Promise(Object)} Un objet user si l'utilisateur possède les droits indiqués, 
 * null sinon
 * @rights user
 */
export async function speaker(user, groupUID){
    return await admin(user, groupUID);
}

/**
 * @summary Authentifie un utilisateur anonyme eneffectuant une requête knex {@link list_selectors.usersWithAdminRights} et en appelant {@link User} et {@link LDAPAdmin}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.  
 * * @return {Promise(Object)} Un objet user si l'utilisateur possède les droits indiqués, 
 * null sinon
 * @rights user
 */
export async function admin(user, groupUID){
    let adminList = await list_selectors.usersWithAdminRights(user, groupUID);
    if (typeof adminList != "undefined" && adminList.indexOf(user.uid) != -1)
        return new User(user, new LDAPAdmin(user));
}

/**
 * @summary Authentifie un utilisateur comme viewer(groupUID) à l'aide de {@link User} et {@link LDAPSupervisor}
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête.  
 * @return {Promise(uid)} L'utilisateur possède-t-il les droits de superviseur ? 
 * Si oui, renvoie la justification. Sinon, renvoie false.
 * Attention : renvoie true si l'utilisateur a les droits mais sans justification.
 * @rights user
 */
export async function superviser(user, groupUID){
    let supervised_groups = await list_selectors.supervisedGroups(user);
    console.log(supervised_groups);
    for(let i = 0; i < supervised_groups.length; i++){
        if(supervised_groups[i].uid == groupUID){
            let user_obj = new User(user, new LDAPSupervisor(user));
            user_obj.justification = (supervised_groups.justification && supervised_groups.justification[i]);
            return user_obj;
        }
    }
    return false;
}