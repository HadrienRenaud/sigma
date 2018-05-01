# A l'attention des développeurs de sigma-frontend

:::info
TODO local dans le temps:
- faire GroupAdministrer
- faire les fichiers pour les MetaGroups
- faire mon PSC ;/
- faire le back putain!! le rendre compatible avec la wish_list
:::


:::info
Pour developper et tester les minimodules, merci de restreindre le caca au dossier src/main/index/ (voire minimodules/). Donc par exemple, creer un sous-dossier "minimodules/monMinimodule/" avec dedans "MonMinimodule.jsx" et l'importer dans Index.jsx
:::

:::info
Merci de creer une branche git pour chaque minimodule
:::

## Pourquoi ce fichier ?

Ce fichier regroupe toutes les conventions et les remarques que les développeurs ont jugé utile de préciser pour 
1. faciliter la tâche des développeurs suivants
2. éviter que le code parte en grosse bouillasse illisible

Les infos regroupées ici ne concernent que les gens qui veulent vraiment comprendre et modifier le code. Il est donc séparé du README.md principal pour ne pas le surcharger inutilement.


## Structure détaillée des fichiers source

Pour la structure générale du projet, aller voir le README principal.

Principes généraux : 
- à côté d'un ```<Route>```, merci de toujours mettre un commentaire pour dire où se trouve le .jsx qui est rendered par le path concerné
- dans l'idée, un dossier par sous-path, même si ce sera forcément plus compliqué que ça. par exemple src/main/trombino/ contient tous les fichiers nécessaires pour render la page du TOL.

Structure des fichiers source :
* __`src/`__
    * __`assets/`__ : fichiers et images utilisees
    * __`main/`__ : les fichiers jsx source
        * __`group/`__ : page d'un groupe
            * __`group_view/`__ : les Component à insérer dans GroupView
        * __`index/`__ : page d'accueil de sigma
            * `formulaire_blablabla.jsx` : ne pas en tenir compte, c'est a quentin louis >.>
            * __`testComp`__ : poubelle de la poubelle
                * `ControlledComponentFormDemo.jsx` : title says it all
        * __`layout/`__ : les Component directement generes par Main.jsx, et qui contiendront tous les Component interessants, et definiront leur position.
        * __`login/`__ : page de login
        * __`member/`__ : page d'un utilisateur. Fournit aussi certaines "briques de base" de l'affichage du tol
        * __`services/`__ : page listant et presentant tous les sites eleve interessants
        * __`trombino/`__ : le TOL
        * `Errors.jsx` : Components d'erreur (dont la fameuse page 404)
        * `Main.jsx` : Component a la base de tout, contenant les comopnent de layout
    * `App.jsx` : le point d'entrée de webpack, wrappant Main.jsx pour permettre d'utiliser apollo et react-router-dom sans se poser (trop) de questions

## Utilisation de graphQL

### On utilise quoi ?

GraphQL est une couche d'abstraction entre le front et le back permettant d'écrire des requêtes de données (du front vers le back) lisibles. 
http://graphql.org/learn/

_On n'utilise pas graphql.js mais une autre implémentation appelée apollo
(En fait on utilise apollo pour le front et une autre implémentation pour le back. Ce n'est pas grave du tout, c'est même assez naturel de faire comme ça)_


On utilise les packages suivants :
- *apollo-client* : une implementation de graphQL "côté client". 
    - ~~Au 20/03/2018 la doc disponible sur internet était plutôt mal foutue, nous conseillons d'aller regarder surtout ces pages-là :~~
        - ~~https://www.howtographql.com/react-apollo/0-introduction/~~
        - ~~https://dev-blog.apollodata.com/a-guide-to-authentication-in-graphql-e002a4039d1~~
    - EDIT: au 10/04/2018 la doc a été mise à jour et franchement c'est devenu pas trop mal. https://www.apollographql.com/docs/react/
    - ainsi que des packages conseillés/demandés par apollo-client :
- **TODO** en vrai y en a un peu beaucoup

### Ecrire une requete graphQL

La première étape est d'écrire la requête graphQL. Celle-ci doit bien sûr être cohérente avec le schéma graphQL de sigma (sinon la requête échouera).

Par exemple :

```javascript
const GET_GROUP = gql`
    query getGroup($uid: ID!) {
        group(uid: $uid) {
            uid
            name
            website
            description
            createdAt
            updatedAt
        }
    }
`;
```

### Envoyer la requête graphQL et recupérer les données renvoyées

Le code ci-dessous est un MWE (minimal working example) de Component utilisant une requête GraphQL. L'auteur estime qu'il est lisible et compréhensible tel quel, et donc facilement copiable-modifiable.

```javascript
/**
 * @author kadabra
 * 
 * Dans cet exemple, supposons qu'il y a dans le schema 
 *  - une Query 'searchPaintCatalog' qui renvoie une [ID!] des numeros de produits qui correspondent aux criteres de recherche (color et quality)
 *  - une Query 'popularity' qui renvoie un type Popularity ayant deux sous-champs scalaires (Int en l'occurrence).
*/
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/**
 * @constant Requête GraphQL
 * 
*/
const GET_PAINT = gql`
    query getPaintQuery(
         # ce nom ("getPaintQuery") n'est pas vraiment utile.
        $color: String, # arguments de la Query
        $quality: String
    ) {
        # la Query proprement dite
        # une première Query, qui renvoie un [ID]
        searchPaintCatalog( 
            color: $color,
            quality: $quality
        ),
        # une deuxième Query, qui renvoie un objet donc il faut expliciter les sous-champs
        popularity( 
            color: $color
        ){
            localPop
            worldPop
        }
    }
`;

class PaintExampleClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Query query={GET_PAINT}
                variables={{
                    color: this.props.color, 
                    quality: this.props.color

                }}
                fetchPolicy='cache-first' //choose cache behaviour
            >
                { ({ loading, error, data }) => {
                    if (loading) 
                        return <div>Chargement, patientez SVP...</div>;
                    else if (error) 
                        return <div>Erreur de chargement graphQL.</div>;

                    const { searchPaintCatalog, popularity } = data; //extracts the actual data from object 'data'
                    
                    return (
                        <div>
                            <p>La couleur que vous avez recherché, le {this.props.color}, a pour popularité {popularity.localPop} dans votre région et {popularity.worldPop} dans le monde.</p>
                            <p>Voici les pots de peinture correspondant à votre requête :</p>
                            {searchPaintCatalog.map(res => {
                                //since searchPaintCatalog is of type [ID], we must use
                                //'map' to produce multiple elements (PaintCard components in this case),
                                //one for each value returned by searchPaintCatalog
                                //it is necessary to give a "key" attribute (https://reactjs.org/docs/lists-and-keys.html)
                                return <PaintCard key={res} uid={res} />;
                            })}
                        </div>
                    );
                } }
            </Query>
        );
    }
}

export default PaintExampleClass;
```

#### Component avec plusieurs requêtes

Il suffit d'écrire les deux requêtes et d'emboîter deux <Query>. 
```javascript
<Query query={QueryOne}>
    {({ loading: loadingOne, data }) => (
        const { one } = data;
        <Query query={QueryTwo}>
            {
                ({ loading: loadingTwo, data }) => {
                const { two } = data;
                if (loadingOne || loadingTwo)
                    return <span>loading...</span>
                return <Blablabla attr1={one}, attr2={two}/>
                }
            }
         </Query>
    )}
</Query>
```
https://www.apollographql.com/docs/react/react-apollo-migration.html

#### Avant (apollo-graphql v<3.0)

Pour info. Normalement on peut enlever cette sous-section mais elle est déjà écrite alors...

*Principe* : on wrap le Component avec une fonction de apollo-client qui donne une props supplémentaire contenant les données. On peut considérer, en écrivant le Component, que les résultats sont dans `this.props.data`.

Modèle :
```javascript
const GroupViewWithGraphQL = graphql(GET_GROUP, {
    options: ({ match }) => ({ variables: { uid: match.params.uid } })
}) (GroupView);
```

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

### Liste des fichiers utilisant GraphQL
- `App.jsx` bien sûr
- `trombino/Trombino.jsx`
- **TODO**


## Point sur les "Card"

Dans plusieurs cas, on retrouve la situation où on a besoin d'afficher une liste d'objets issus d'une recherche. C'est le cas pour les User dans le TOL, pour les annonce/événements/posts attachés à un groupe (que ce soit 'écrits par' ou 'adressés à') dans la page dédiée...

De plus on a aussi envie de pouvoir afficher un objet tout seul, par exemple la fiche d'un User ou la page d'un événement.

Pour faire ça, on va créer des Component xxxCard (UserCard, AnnouncementCard...) prenant en params l'id (ou uid s'il s'agit d'un Group ou User) de l'objet en question, et envoyant une requete graphQL pour récupérer les données relatives à cet objet, et qui render la "carte" (appelons-ça comme ça) de l'objet.

Si ce n'est pas clair, regarder comment sont faits `AnnouncementCard.jsx` et `UserCard.jsx`.


## Note concernant react-router

Ne rien importer depuis react-router (le core de react router), mais depuis *react-router-dom* (le package dedie aux sites web). (BrowserRouter, Route, Link, NavLink...) En effet certains Component existent dans les deux mais avec quelques differences.

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
