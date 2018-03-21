# A l'attention des développeurs de sigma-frontend

## Pourquoi ce fichier ?

Ce fichier regroupe toutes les conventions et les remarques que les développeurs ont jugé utile de préciser pour 
1. faciliter la tâche des développeurs suivants
2. éviter que le code parte en grosse bouillasse illisible

Les infos regroupées ici ne concernent que les gens qui veulent vraiment comprendre et modifier le code. Il est donc séparé du README.md principal pour ne pas le surcharger inutilement.

## Structure détaillée des fichiers source

Pour la structure générale du projet, aller voir le README principal.

Principes généraux : 
- à côté d'un ```<Route>```, toujours mettre un commentaire pour dire où se trouve le .jsx qui est rendered par le path concerné
- dans l'idée, un dossier par sous-path, même si ce sera forcément plus compliqué que ça. par exemple src/main/trombino/ contient tous les fichiers nécessaires pour render la page du TOL.

Structure des fichiers source :
* src/
    * assets/
    * main/
        * group/
            * group_view/ : les Component à insérer dans GroupView
                [TODO]
            * GroupView.jsx : la page d'accueil d'un groupe
            [TODO]
        * index/ : [TODO]
        * layout/ : [TODO]
        * login/ : [TODO]
        * member/ : [TODO]
        * services/ : [TODO]
        * trombino/ : [TODO]
        * Errors.jsx
        * Main.jsx
    * App.jsx : le point d'entrée de webpack

== TODO: y a-t-il un meilleur moyen de représenter l'arborescence? aller voir dans carnets.bin/features... ==

## Utilisation de graphQL

### On utilise quoi ?

GraphQL est une couche d'abstraction entre le front et le back permettant d'écrire des requêtes de données (du front vers le back) lisibles. 
http://graphql.org/learn/

_On n'utilise pas graphql.js mais une autre implémentation appelée apollo
(En fait on utilise apollo pour le front et une autre implémentation pour le back. Ce n'est pas grave du tout, c'est même assez naturel de faire comme ça)_


On utilise les packages suivants :
- *apollo-client* : une implementation de graphQL "côté client". 
    - Au 20/03/2018 la doc disponible sur internet était plutôt mal foutue, nous conseillons d'aller regarder surtout ces pages-là :
        - https://www.howtographql.com/react-apollo/0-introduction/
        - https://dev-blog.apollodata.com/a-guide-to-authentication-in-graphql-e002a4039d1
        - [TODO (il y en a d'autres)]
- [TODO]

### Ecrire une requete graphQL

La première étape est d'écrire la requête graphQL. Celle-ci doit bien sûr être cohérente avec le schéma graphQL de sigma (sinon la requête échouera).

Par exemple :

```javascript
const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        accessGroups {
            group(uid: $uid) {
                uid
                name
                website
                description
                createdAt
                updatedAt
            }
        }
    }
`;
```

### Envoyer la requête graphQL et recupérer les données renvoyées

*Principe* : on wrap le Component avec une fonction de apollo-client qui donne une props supplémentaire contenant les données. On peut considérer, en écrivant le Component, que les résultats sont dans `this.props.data`.

`graphql(.,.)` prend pour parametres :
1. la requête graphql (définie par ```gql `...` ```)
2. un objet JSON qui contient les options, notamment les variables (à insérer ds la requête graphql)
   par exemple :
   ```
   options: {
       variables: {
           uid: 'wilson.jallet'
       }
   }
   ```

   Alternativement, les options peuvent etre un callback (*comme ci-dessus d'ailleurs*) prenant les props passes au composant,
   et qui renvoie `variables`, 
   
   et renvoie un callback (_i.e. une fonction_) prenant en argument un Component React ;
   
   ce callback wrappe le Component avec (_i.e. renvoie un Component identique mais qui a en plus_) un champ `data` dans ses `props` ; 
   
   c'est dans ce `props` `data` que se trouvent les resultats de la requete graphQL.

## Les développeurs du front

- X 2015
    - Baptiste Pécatte
    - Swynfel (Quentin Gendre)
- X 2016
    - manifold
    - kadabra
    - Toubeix (Matthieu)
- X 2017
    - toi peut-être?