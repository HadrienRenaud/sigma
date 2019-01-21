/**
 * @file Fonctions pour interagir avec la BDD sigma et le LDAP.
 * @author akka vodol
 */
import knex from '../../../db/knex_router';
import * as selectors from './selectors';
import * as list_selectors from './list_selectors';
import {Open as LDAPOpen, User as LDAPUser}  from '../../ldap/users';


const utilisateur = new LDAPOpen();

let result = utilisateur.getMembers("br").then(res => {
    console.log("Got it");
    return res;
});

export { utilisateur };
/* Ce n'est pas comme ça qu'on est censé fonctionner. Toute utilisation de utilisateur
 a vocation à être temporaire, et sera remplacé par l'usage des fonctions 
 d'authentification correctes
*/

/*
    Le tag @rights est la gestion des autorisations.

    Le système GraphQL est pensé comme l'interface par laquelle les utilisateurs 
    intéragissent avec sigma, les graphismes en moins.
    Le client peut envoyer tout type de requête. C'est au niveau des resolvers
    que les permissions sont gérées. D'où le @rights

    Commençons par un rappel sur le fonctionnement des droits. 
    Chaque utilisateur a un certain niveau de droit sur chaque groupe. Ce niveau de droit indique
    ce qu'il a le droit de savoir et de faire. Chaque niveau est inclus dans les niveaus supérieur.
    Les différents niveaux sont :
    none - aucun droit
    viewer : l'utilisateur a visibilité sur le groupe. Il sait que le groupe existe, et a accès à un certain nombre d'infos.
    member : l'utilisateur est membre du groupe
    speaker : l'utilisateur peut parler au nom du groupe. Il a le droit de publier des annonces et d'organiser des évènements
    admin : l'utilisateur a tous les droits sur le groupe

    Certaines fonctions de connectors effectuent des vérifications d'authorisations avant 
    de renvoyer une réponse, d'autres non. Pour être sur qu'on ne renvoie jamais de réponse
    sans avoir au préalable éffectué les bonnes vérifications, chaque fonction possède dans sa
    description un attribut droit, qui décrit les droits que fournit cette fonction.

    La valeur de @rights peut être :
    super - la fonction n'effectue aucune véri-fication, et renvoie le resultat demandé
    admin( groupUID ) - la fonction ne fait que ce qu'un admin du groupe indiqué aurait le droit de faire
    speaker( groupUID ), member( groupUID ), veiwer( groupUID ) - même chose
    user - la fonction ne fait que ce que l'utiliateur a le droit de faire (vérifications via l'argument user)

    La procédure a suivre est la suivante : quand une fonction possède un certain niveau de droit, 
    elle ne peut appeler une fonction possédant un niveau de droit plus large que si 
    1 ) on a au préalable vérifié que l'utilisateur possédait effectivement ces droits. 
    ou
    2 ) on s'est assuré que l'opération effectuée par cet appel particulier de la fonction était dans les droits
    de l'utilisateur

    Les resolvers de base de mutation et query ont des droits user.

    Les fonctions qui ne modifient pas la BDD et ne renvoient pas de données sur la BDD n'ont pas de rights.
*/

/**
 * @summary Génère une promise.
 * @function
 * @desc Les fonctions ici sont toutes supposées renvoyer une promise. 
 * Si on veut renvoyer une valeur directement, cette fonction permet de construire 
 * une Promise qui renvoie cette valeur facilement.
 * @arg {Object} val - La valeur qu'on veut renvoyer.
 * @return {Promise(Object)} Une promise qui renvoi val
 */
const quickPromise = (val) => { //hawkspar->akka ; selon VSCode pas utilisé donc useless
    return new Promise( (resolve, reject) => {
        resolve(val);
    });
};

/**
 * @summary Renvoie le nom de la table dans laquelle il faut chercher en fonction de ce qu'on veut
 * @desc Ceci est obsolète, et devra être supprimé quand le code sera RAS
 * @arg {String} wantedType - Un string indiquant le type de groupe qu'on veut. Peut être `"simple"`, `"meta"` ou `"all"`. 
 * @return {String} Le nom de la table dans laquelle la requète doit être effectuée.
 */
function getGroupTableName(wantedType){
    switch(wantedType){
    case "simple":
        return "simple_groups";
    case "SimpleGroup":
        return "simple_groups";
    case "meta":
        return "meta_groups";
    case "MetaGroup":
        return "meta_groups";
    case "all":
        return "groups";
    default:
        throw "invalid type request : " + wantedType + "is not a valid group type";
    }
}

export function rasifyGroupUID(uid){ //hawkspar->akka ; je plussoie le nom mais pas très lisible
    return String(uid).replace(' ', '_').replace(/\W/g, '').toLowerCase();
}

/**
 * @summary Renvoie un unique groupe, ssi ce groupe est visible par l'utilisateur
 * @desc Pour l'instant, la fonction effectue la même requête que `getAllVisibleGroups` 
 * et restreint au groupe demandé. Cette fonction peut être implémentée de manière 
 * plus efficace et plus chiante.
 * @arg {Object} user - Utilisateur effectuant la requête. 
 * @arg {String} uid - Identifiant du groupe voulu.
 * @arg {String} type - Type de groupe voulu. `"simple"`, `"meta"` ou `"all"`.
 * @return {Promise(group)} Retour de requête knex. Le groupe demandé, si l'utilisateur a le droit de la voire.
 * @rights user
 */
export async function getGroupIfVisible(user, groupUID, type="all"){
    let group_table_name = getGroupTableName(type);
    let visible_groups = await selectors.visibleGroups(user);
    return knex.with('visible_groups', visible_groups).select()
        .from(group_table_name).innerJoin('visible_groups', function (){
            this.on('visible_groups.uid', '=', group_table_name + '.uid');
        }).where(group_table_name + '.uid', groupUID).then(res => res[0]);
}

export const getSimpleGroupIfVisible = (user, groupUID) => getGroupIfVisible(user, groupUID, "simple");
export const getMetaGroupIfVisible = (user, groupUID) => getGroupIfVisible(user, groupUID, "meta");

/**
 * @summary Renvoie tous les groupes simples visibles par l'utilisateur user
 * @desc Cette fonction effectue une requête knex. 
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {String} wantedType - Type de groupe voulu : `"simple"`, `"meta"` ou `"all"`. 
 * @return {Promise} Retour de requête knex. Liste de tous les groupes que l'utilisateur a le droit de voire.
 * @rights user
 */
export async function getAllVisibleSimpleGroups (user){
    let visible_groups = await selectors.visibleGroups(user);
    return getSimpleGroupsFromCallbacks(user, visible_groups);
}

/**
 * @summary Renvoie tous les meta groupes visibles par l'utilisateur user
 * @desc Cette fonction effectue une requête knex. 
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {String} wantedType - Type de groupe voulu : `"simple"`, `"meta"` ou `"all"`. 
 * @return {Promise} Retour de requête knex. Liste de tous les groupes que l'utilisateur a le droit de voire.
 * @rights user
 */
export async function getAllVisibleMetaGroups (user){
    let visible_groups = await selectors.visibleGroups(user);
    return getMetaGroupsFromCallbacks(user, visible_groups);
}

/**
 * @summary Renvoie tous les groupes visibles par l'utilisateur user
 * @desc Cette fonction effectue une requête knex. Elle gère l'arête de parenté.
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {String} wantedType - Type de groupe voulu : `"simple"`, `"meta"` ou `"all"`. 
 * @return {Promise} Retour de requête knex. Liste de tous les groupes que l'utilisateur a le droit de voire.
 * @rights user
 */
export async function getAllVisibleGroups(user){
    let visible_groups = await selectors.visibleGroups(user);
    return getGroupsFromCallbacks(user, visible_groups);
}

/**
 * @summary Teste si un utilisateur est membre d'un groupe
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {Object} groupUID - L'id du groupe dont on veu savoir si l'utilisateur est membre. 
 * @return {Promise(Boolean)} Boolean indiquant si l'utilisateur est membre du groupe.
 * @rights user
 */
export async function isMember(user, groupUID){
    let member_list = await getGroupMemberUsers(user, groupUID);
    return member_list && (member_list.indexOf(groupUID) != -1);
}

/**
 * @summary Attribue un UID qui n'a pas encore été utilisé à un groupe
 * @desc RASifie le string initialUID si necessaire (ramené à de l'ASCCI sans espace), puis si l'uid est deja pris rajoute un n a la fin et reteste
 * @arg {String} uid - L'uid du groupe dont on veut les administrateurs. 
 * @return {Promise} Retour de requête knex. Promise qui renvera une liste de tous les utilisateurs ayant droit d'admin sur le groupe
 * @rights user
 * remarque : n'importe qui peut tester si un groupe existe en demandant a créer un groupe avec ce nom la et en regardant si
 * son UID a été modifié. Je ne vois pas comment contourner ce problème, c'est donc une faille permanente de sigma.
 */
export function getAvailablegroupUID(initialUID){
    let rasUID = rasifyGroupUID(initialUID);
    return knex.from('groups').where('uid', rasUID).then(res => {
        if (res.length == 0) {
            return (rasUID);
        } else {
            return (getAvailablegroupUID(rasUID + 'n'));
        }
    });
}

/**
 * @summary Créé un groupe si les arguments sont tous valides
 * @desc Les arguments doivent être valides, sauf pour uid. Une clé uid valide sera générée dans tous les cas. 
 * Les authorisations de l'utilisateur ne sont pas vérifiées
 * On teste si l'utilisateur qui envoie la requête a des droits d'admin sur le parent du groupe qui doit être créé, avec la fonction
 * `getUsersWithAdminRights`.
 * Si un argument est invalide ou si l'utilisateur n'a pas les droits, la fonction renvoie une erreur
 * @arg {Object} user - L'utilisateur qui effectue la requête. 
 * @arg {Object} args - Les arguments envoyés à la mutation. Cf le schéma GraphQL 
 * @return {Promise} Retour de requête knex. Le groupe qui vient d'être créé. En cas d'echec, renvoie une erreur.
 * @rights admin (args.parent_uid)
 */
export async function createSubgroup(user, args){
    if (typeof args.parent_uid != 'string')
        throw "Illegal argument : parent_uid must be a non null string";
    if (typeof args.name != 'string')
        throw "Illegal argument : name must be a non null string";

    let rasUID = await getAvailablegroupUID(args.uid);

    // TODO : appeller une fonction de LDAPUser pour y créer un groupe.
    await knex('simple_groups').insert({
        uid: rasUID,
        parent_uid: args.parent_uid,
        createdAt: knex.fn.now(),
        updatedAt: this.createdAt,
        name: args.name,
        website: args.website,
        description: args.description,
        school: args.school,
        type : "simple"
    });

    return getGroupIfVisible(user, rasUID);
}

/**
 * @summary Créé un groupe si les arguments sont tous valides et l'utilisateur est authorisé
 * @desc Les arguments doivent être valides, sauf pour uid. Une clé uid valide sera générée dans tous les cas. 
 * On teste si l'utilisateur qui envoie la requête a des droits d'admin sur le parent du groupe qui doit être créé, avec la fonction `getUsersWithAdminRights`
 * Si un argument est invalide ou si l'utilisateur n'a pas les droits, la fonction renvoie une erreur
 * @arg {Object} user - L'utilisateur qui effectue la requête. 
 * @arg {Object} args - Les arguments envoyés à la mutation. Cf le schéma GraphQL 
 * @return {Promise} Retour de requête knex. Le groupe qui vient d'être créé. En cas d'echec, renvoie une erreur.
 * @rights user
 */
export async function createGroupIfLegal(user, args){
    if( await LDAPOpen.isGroupAdmin(utilisateur, args.parentuid) ){
        return createSubgroup(user, args);
    }else{
        throw "illegal request : you must have admin rights over a group to create a subgroup of that group";
    }
}

/**
 * @summary Renvoie toues les requêtes de type UserJoinGroup 
 * @desc Une requête UserJoinGroup est envoyée par un utilisateur à un groupe, 
 * pour demander à rejoindre ce groupe
 * @arg {Object} user - L'utilisateur qui effectue la requête. 
 * @arg {String} args - L'identifiant du groupe qui reçoit la requête. 
 * @return {Promise(Object)} Retour de requête knex. Toutes les requêtes destinées au groupe.
 * @rights admin(recipientUID)
 */
export async function getUserJoinGroupRequests(user, recipientUID){
    let result = knex.select('id', 'useruid', 'message').from('user_join_group')
        .where('recipient', recipientUID);
    return result.map( obj => {
        obj.type = "UserJoinGroup";
        return obj;
    });
}

/**
 * @summary Renvoie toues les requêtes de type GroupJoinEvent 
 * @desc Une requête UserJoinGroup est envoyée par un groupe à un évènement (donc aux administrateurs de l'évènement), 
 * pour demander à rejoindre cet évènement.
 * Remarque : toutes les requêtes ont pour le moment un attribut recipient, 
 * mais ici il ne sera a terme pas utilisé.
 * @arg {Object} user - L'utilisateur qui effectue la requête. 
 * @arg {String} args - L'identifiant du groupe qui reçoit la requête. 
 * @return {Promise(Object)} Retour de requête knex. Toutes les requêtes destinées au groupe.
 * @rights speaker(recipientUID)
 */
export async function getGroupJoinEventRequests(user, recipientUID){
    let result = await knex.select('id', 'senderuid', 'eventuid', 'message').from('group_join_event')
        .where('recipient', recipientUID);
    return result.map( obj => {
        obj.type = "GroupJoinEvent";
        return obj;
    });
}


/**
 * @summary Renvoie toues les requêtes de type GroupJoinEvent 
 * @desc Une requête UserJoinGroup est envoyée par un groupe à un évènement (donc aux administrateurs de l'évènement), 
 * pour demander à rejoindre cet évènement.
 * Remarque : toutes les requêtes ont pour le moment un attribut recipient, 
 * mais ici il ne sera a terme pas utilisé.
 * @arg {Object} user - L'utilisateur qui effectue la requête. 
 * @arg {String} args - L'identifiant du groupe qui reçoit la requête. 
 * @return {Promise(Object)} Retour de requête knex. Toutes les requêtes destinées au groupe.
 * @rights speaker(recipientUID)
 */
export async function getYourGroupHostEventRequests(user, recipientUID){
    let result = await knex.select('id', 'senderuid', 'eventuid', 'message').from('your_group_host_event')
        .where('recipient', recipientUID);
    return result.map( obj => {
        obj.type = "YourGroupHostEvent";
        return obj;
    });
}


//Don't forget the argument user is the guy who makes the request, not the user we want
export const getUser = (user, uid, db) => { 
    const refactorer = (data) => {
        if (typeof data.brRoom == 'string') data.brRoom = [data.brRoom];

        return {
            uid: uid,
            lastName: data.sn,
            givenName: data.givenName,
            nickname: data.displayName,
            nationality: data.country,
            birthdate: data.brBirthdate,
            groups: data.brMemberOf,
            mail: data.mail,
            phone: data.telephoneNumber,
            address: data.brRoom,
            promotion: data.brPromo
        };
    };

    const result = utilisateur.getUser(uid).then(res => {
        return refactorer(res[0]);
    });

    return result;
};

// All these messages are returned if they are visible

export async function getAnnouncement(user, messageID){
    let res = await knex.select().from('announcements').where('id', messageID)
        .whereIn('id', await selectors.visibleAnnouncements(user));
    if(res[0]){
        res[0].type = 'Announcement';
        return res[0];
    }
    res = await knex.select().from('events').where('id', messageID)
        .whereIn('id', await selectors.visibleEvents(user));
    if(res[0]){
        res[0].type = 'Announcement';
        return res[0];
    }
    return undefined;
}

export async function getEvent(user, messageID){
    let res = await knex.select().from('events').where('id', messageID)
        .whereIn('id', await selectors.visibleEvents(user));
    if(res[0]){
        res[0].type = 'Event';
        return res[0];
    }
    return undefined;
}

export async function getPrivatePost(user, messageID){
    let res = await knex.select().from('private_posts').where('id', messageID)
        .whereIn('id', await selectors.visiblePrivatePosts(user));
    if(res[0]){
        res[0].type = 'PrivatePost';
        return res[0];
    }
    return undefined;
}

export async function getQuestion(user, messageID){
    let res = await knex.select().from('questions').where('id', messageID)
        .whereIn('id', await selectors.visibleQuestions(user));
    if(res[0]){
        res[0].type = 'Question';
        return res[0];
    }
    return undefined;
}

export async function getAnswer(user, messageID){
    let res = await knex.select().from('answers').where('id', messageID)
        .whereIn('id', await selectors.visibleAnswers(user));
    if(res[0]){
        res[0].type = 'Answer';
        return res[0];
    }
    return undefined;
}

/**
 * @summary Renvoie un message en fonction de son identifiant.
 * @param {*} user - Utilisateur effectuant la requête.
 * @param {*} eventID - Identifiant unique de l'événement.
 * @rights super
 */
export async function getMessage(user, messageID){
    return getEvent(user, messageID) | 
        getAnnouncement(user, messageID) |
        getPrivatePost(user, messageID) |
        getQuestion(user, messageID) |
        getAnswer(user, messageID);
}

export async function allVisibleEvents(user){
    let selection = await selectors.visibleEvents(user);
    let result = await knex.select().from('events').whereIn('id', selection);
    for(let r of result){
        r.type = 'Announcement';
    }
    return result;
}

export async function allVisibleAnnouncements(user){
    let selection = await selectors.visibleAnnouncements(user);
    let result = await knex.select().from('announcements').whereIn('id', selection);
    result = result.concat(
        await knex.select().from('events').whereIn('id', selection)
    );
    for(let r of result){
        r.type = 'Announcement';
    }
    return result;
}

export async function receivedPrivatePosts(user, groupUID){
    let received_messages = await selectors.recievedMessages(user, groupUID);
    let result = await knex('private_posts').select().whereIn('id', received_messages);
    for(let entry of result){
        entry.type = "PrivatePost";
    }
    return result;
}

export async function receivedQuestions(user, groupUID){
    let received_messages = await selectors.recievedMessages(user, groupUID);
    let result = await knex('questions').select().whereIn('id', received_messages);
    for(let entry of result){
        entry.type = "Question";
    }
    return result;
}

export async function receivedAnswers(user, groupUID){
    let received_messages = await selectors.recievedMessages(user, groupUID);
    let result = await knex('answers').select().whereIn('id', received_messages);
    for(let entry of result){
        entry.type = "Answer";
    }
    return result;
}


export async function visibleMessages(user, messageID){

}

export async function getMessageGroupAuthors(user, messageID){
    return getGroupsFromCallbacks(user, qb  => {
        return qb.select({uid: 'group'}).from('group_message_relationships')
            .where('message', messageID).whereIn('status', ['host', 'publish']);
    });
}

export async function getMessageGroupRecipients(user, messageID){
    return getGroupsFromCallbacks(user, qb  => {
        return qb.select({uid: 'group'}).from('group_message_relationships')
            .where('message', messageID).where('status', 'recieve');
    });
}

/**
 * @summary Renvoie simplement un groupe en fonction de son identifiant.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} groupUID - Identifiant unique du groupe.
 * @author manifold 
 * @rights super
 */
export const getGroup = (user, groupUID) => {
    // Une sélection sur une table renvoie un tableau.
    // Knex renvoie une promesse, qui se résout en le tableau sélectionné.
    // On récupère son unique valeur, puisqu'on filtre sur l'identifiant unique.
    return knex.select().from('groups').where('uid',groupUID).then(results => results [0]);
};

/**
 * @summary Renvoie simplement un groupe simple en fonction de son identifiant.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} groupUID - Identifiant unique du groupe.
 * @author manifold 
 * @rights super
 */
export const getSimpleGroup = (user, groupUID) => {
    return knex.select().from('simple_groups').where('uid',groupUID).then(results => results [0]);
};

/**
 * @summary Renvoie simplement un meta groupe en fonction de son identifiant.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} groupUID - Identifiant unique du groupe.
 * @author manifold 
 * @rights super
 */
export const getMetaGroup = (user, groupUID) => {
    return knex.select().from('meta_groups').where('uid',groupUID).then(results => results [0]);
};

/**
 * @summary Refuse une requête d'un groupe voulant rejoindre un évènement
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {Int} requestID - L'id de la requête à refuser. 
 * @return {Promise(Boolean)} Vrai si l'opération a réussie;
 * @rights admin(request.recipient)
 */
export async function denyGroupJoinEventRequest(user, requestID){
    await knex('group_join_event').where('id', requestID).del();
    return true;
}

/**
 * @summary Refuse une requête d'un groupe voulant rejoindre un évènement
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {Int} requestID - L'id de la requête à refuser. 
 * @return {Promise(Boolean)} Vrai si l'opération a réussie;
 * @rights admin(request.recipient)
 */
export async function acceptGroupJoinEventRequest(user, requestID){
    let request = await knex('group_join_event').select().where('id', requestID);
    if( !request)
        return false;
    await knex('group_join_event').where('id', requestID).del();
    let group = request[0].senderuid;
    let event = request[0].eventuid;
    await knex('group_participation').insert({
        group : group,
        message : event,
        status : "join"
    });
    return;

}


/**
 * @summary Refuse une requête d'un groupe voulant rejoindre un évènement
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {Int} requestID - L'id de la requête à refuser. 
 * @return {Promise(Boolean)} Vrai si l'opération a réussie;
 * @rights admin(request.recipient)
 */
export async function denyYourGroupHostEventRequest(user, requestID){
    await knex('your_group_host_event').where('id', requestID).del();
    return true;
}

/**
 * @summary Refuse une requête d'un groupe voulant rejoindre un évènement
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {Int} requestID - L'id de la requête à refuser. 
 * @return {Promise(Boolean)} Vrai si l'opération a réussie;
 * @rights admin(request.recipient)
 */
export async function acceptYourGroupHostEventRequest(user, requestID){
    let request = await knex('your_group_host_event').select().where('id', requestID);
    if( !request)
        return false;
    await knex('group_join_event').where('id', requestID).del();
    let group = request[0].recipient;
    let event = request[0].eventuid;
    await knex('group_message_relationships').insert({
        group : group,
        message : event,
        status : "host"
    });
    return;

}

export function takeAdminRights(user, groupUID, justification){
    return knex('taken_rights').insert({
        user_uid : user.uid,
        group_uid : groupUID,
        justification : justification
    });
}


export function releaseAdminRights(user, groupUID){
    return knex('taken_rights').del().where('user_uid', user.uid).where('group_uid', groupUID);
}

/**
 * @summary Renvoie les membres d'un groupe quelquonque.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} metaGroupUID - Identifiant unique du groupe.
 * @return {Promise(List)} Une liste des uid de tous les membres du groupe
 * @author akka vodol 
 * @rights member(metaGroupUID)
 */
export async function getGroupMemberUsers(user, GroupUID){
    let type = await list_selectors.getGroupType(user, GroupUID);
    switch( type ){
    case "SimpleGroup":
        return utilisateur.getMembers(GroupUID);
        // return ["anatole.romon"];
    case "MetaGroup":
        return getMetaGroupMemberUsers(user, GroupUID);
    default:
        return undefined;
    }
}
/**
 * @summary Renvoie les membres d'un meta groupe.
 * @param {Object} user - Utilisateur effectuant la requête.
 * @param {String} metaGroupUID - Identifiant unique du groupe.
 * @return {Promise(List)} Une liste des uid de tous les membres du groupe
 * @author akka vodol 
 * @rights member(metaGroupUID)
 */
export async function getMetaGroupMemberUsers(user, metaGroupUID){
    let member_group_list = await selectors.metaGroupMembers(user, metaGroupUID).then(cb => cb(knex));
    let members = [];
    for(let memberGroup of await member_group_list){
        members = members.concat(getGroupMemberUsers(user, metaGroupUID));
    }
}

export async function getSimpleGroupsFromCallbacks (user, selection){
    return knex.with('selection', selection).select("simple_groups.*").from("simple_groups")
        .innerJoin('selection', function (){
            this.on('selection.uid', '=', 'simple_groups.uid');
        });
}

export async function getMetaGroupsFromCallbacks (user, selection){
    return knex.with('selection', selection).select().from("meta_groups")
        .innerJoin('selection', function (){
            this.on('selection.uid', '=', 'meta_groups.uid');
        });
}

/**
 * @summary Renvoie tous les groupes dans l'intersection définie par les callbacks
 * @desc Cette fonction effectue une requête knex. Elle gère l'arête de parenté.
 * @arg {Object} user - Représente l'utilisateur qui a effectué la requête. 
 * @arg {String} wantedType - Type de groupe voulu : `"simple"`, `"meta"` ou `"all"`. 
 * @return {Promise} Retour de requête knex. Liste de tous les groupes que l'utilisateur a le droit de voire.
 * @rights user
 */
export async function getGroupsFromCallbacks(user, cbList){
    // console.log(cbList);
    let all_simple_groups = await getSimpleGroupsFromCallbacks(user, cbList);
    let all_meta_groups = await getMetaGroupsFromCallbacks(user, cbList);
    return all_simple_groups.concat(all_meta_groups);
}

/*
 * réflexion sur une façon possible de gérer les utilisateurs sans en demander trop à LDAP
 * Sans utilité pour le moment, ne faites pas attention 
 */

/*
function smartUserObject(user, uid){
    this.user = user;
    this.uid = uid;

    this.resolution = {};
    let resolutionAlias = this.resolution;

    let attributeDictionnary = {
        givenName : "givenName"
    };

    for(let attribute in attributeDictionnary){
        this[attribute] = function(){
            return new Promise((resolve, reject) => {
                resolutionAlias[attributeDictionnary[attribute]] = resolve;
            });
        };
    }

    this.resolve = async function(){
        let userObject = await renseignerSurUtilisateur(this.user, this.uid);
        for(let attribute in this.resolution){
            this.resolution[attribute](userObject.attribute);
        }
    };
}
*/