Contribuer au projet
===

## TODO

Quand tout le reste sera fait, penser à :
- Rassifier la répartition `dependencies`/`dev-dependencies` du package.json
- Configurer le système de local data caching (customizer `(new ApolloClient).cache` dans `index.js`). Apollo-Client se vante d'avoir une bonne gestion du caching, autant l'utiliser. https://www.apollographql.com/docs/react/api/apollo-client.html
- Code splitting: don’t make our visitors download the entire app before they can use it. https://reacttraining.com/react-router/web/guides/code-splitting
- Getting the footer to stick to the bottom of pages with sparse content: https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/



## Structure du code

La structure générale du dossier est indiquée dans le README. Ici on indique la structure du code source, i.e. de `src/`.

TODO: le faire

## Webpack et serveur

On utilise [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) pour servir l'application.

Il faut considérer que les fichiers de `/build/` sont overwritten à chaque build de webpack. Donc ne jamais les modifier directement, ça ne sert à rien.

## Dépendances

(Les dépendances liées à l'utilisation de GraphQL sont détaillées dans une section dédiée.)

### ReactJS

*TODO: maybe give some insights on using React?*

React c'est cool :)
https://reactjs.org/docs/hello-world.html

### React-Router

On utilise [react-router-dom](https://www.npmjs.com/package/react-router-dom) pour le routage (i.e. savoir quoi afficher pour quel path demandé). "-dom" signifie que c'est pour du développement web et pas mobile/tablette.

-[Présentation du principe de react-router](https://reacttraining.com/react-router/core/guides/philosophy/dynamic-routing)
-[La documentation](https://reacttraining.com/react-router/web/api/)

### Semantic UI (et `semantic-ui-react`)

Pour info (ne lisez pas la doc de Semantic UI "pur", ça ne sert à rien dans ce projet ; éventuellement jeter un coup d'oeil aux elements) : https://semantic-ui.com/ . 
Il existe plusieurs implémentations différentes de Semantic UI avec React, semantic-ui-react est la seule qui semble sérieuse...

On utilise, donc, [semantic-ui-react](https://www.npmjs.com/package/semantic-ui-react) comme UI framework de React (i.e. est à css ce que React est à html). La documentation se trouve [ici](https://react.semantic-ui.com/). 

On a choisi d'importer les stylesheet par CDN au lieu de les télécharger dans le projet. Inconvénient : il faut avoir internet pour avoir accès aux stylesheet.

---

From https://react.semantic-ui.com/usage#content-delivery-network-cdn :

Content Delivery Network (CDN)

You can use the default Semantic UI stylesheet by including a Semantic UI CDN link in your index.html file.

This is the quickest way to get started with Semantic UI React. You won't be able to use custom themes with this method.

---


## Utilisation de GraphQL

### On utilise quoi ?

[GraphQL](http://graphql.org/learn/) est une couche d'abstraction entre le front et le back permettant d'écrire des requêtes de données (du front vers le back) lisibles. 

On n'utilise pas graphql.js mais une autre implémentation appelée *apollo-client* : une implementation de graphQL "côté client". Rq: on utilise aussi [graphql-tag](https://www.npmjs.com/package/graphql-tag).

[La doc est ici](https://www.apollographql.com/docs/react/). (attention, le domaine apollographql.com contient la doc pour tous les modules d'*apollographql*, y compris des modules pour graphQL "côté serveur" ou pour d'autres frameworks que React... [janvier 2019])

La [page npm de react-apollo](https://www.npmjs.com/package/react-apollo) conseille en fait d'installer tout un tas de packages liés :

--- 

It is simple to install React Apollo and related libraries.
```bash
# installing the preset package and react integration 
npm install apollo-client-preset react-apollo graphql-tag graphql --save
 
# installing each piece independently 
npm install apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag graphql --save
```

---

### Ecrire une requête graphQL

La première étape est d'écrire la requête graphQL. Celle-ci doit bien sûr être cohérente avec le schéma graphQL de l'API (sinon la requête échouera).

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

Le fichier `/examples/UseQueryGraphQL.jsx` contient un MWE de comment utiliser le Component Query pour envoyer des query graphQL.

**TODO**: faire pareil avec Mutation dans un fichier `/examples/UseMutationGraphQL.jsx`

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



## Dépendances - outils de développement

### ESLint

On utilise ESLint pour standardiser le style du code. 
Il est ~~préférable~~ nécessaire de l'installer **globalement** avec `npm install -g eslint`.

Lors d'une validation ESLint, un ensemble de règles de style sont appliquées, elles sont configurables dans le fichier `.eslintrc.json`. Par exemple, actuellement, la config ESLint impose d'utiliser quatre espaces pour les indentations et d'utiliser des points-virgule en fin de ligne. 
Les options de configuration sont bien expliquées dans la [doc dédiée](https://eslint.org/docs/rules/).

Pour faire valider les fichiers source par ESLint, utiliser `npm run lint` (raccourci pour `eslint --ext .js --ext .ts src/ `). L'option `--fix` permet de corriger les fichiers : `npm run lint -- --fix`.
Les différentes façon d'exécuter une validation sont bien expliquées dans la [doc dédiée](https://eslint.org/docs/user-guide/command-line-interface).

Sinon, si vous utilisez Atom ou Visual Studio Code pour éditer votre code, il existe des plugins qui font tourner ESLint _en live_ sur le code et vous préviennent quand il y a une faute de style.

### Outils de test in-browser

Installer le plugin _React dev tools_ dans son navigateur (Chrome, Firefox, Safari) peut être une bonne idée pour inspecter les éléments React au sein d'une page.

## Contact

Le BR 2016, plus particulièrement Wilson Jallet, Guillaume Wang, Quentin Chevalier et Anatole Romon

Le BR 2017, plus particulièrement Olivér Facklam, Grégoire Grzeckowicz et Hadrien Renaud

## Conclusion
chauffez-vous, mythe ALC etc.
