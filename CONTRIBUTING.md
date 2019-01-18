Contribuer au projet
===


## TODO

Quand j'aurais fini tout le reste, penser à :
- Rassifier la répartition `dependencies`/`dev-dependencies` du package.json
- Configurer le système de local data caching (customizer `(new ApolloClient).cache` dans `index.js`). Apollo-Client se vante d'avoir une bonne gestion du caching, autant l'utiliser. https://www.apollographql.com/docs/react/api/apollo-client.html
- Code splitting: don’t make our visitors download the entire app before they can use it. https://reacttraining.com/react-router/web/guides/code-splitting
- Getting the footer to stick to the bottom of pages with sparse content: https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/



## Structure du dossier

- `assets/`: on y met les fichiers statiques, comme les images.
- `dist/`: les fichiers compilés par webpack. Ignoré par git (.gitignore)
- `examples/`: des fichiers exemples qu'on pourra utiliser comme templates pour écrire d'autres Component.
- `node_modules/`: les dépendances du dossier, téléchargées automatiquement par npm. Ignoré par git (.gitignore)
- `src/`: le code source du projet.

Divers fichiers de config à la racine du projet.
- `.babelrc`: config pour babel, le transpileur... transpilateur... bref le truc qui fait la traduction de ES6 vers des versions d'ECMAScript compréhensibles par les machines. Ici, [babel](https://www.npmjs.com/package/babel-loader) est utilisé comme un [*loader*](https://webpack.js.org/concepts/loaders/) par webpack.
- `.eslintignore`: dit à eslint de ne pas linter ces fichiers.
- `.eslintrc.json`: config pour eslint. Le plus susceptible d'être modifié est le champ rules. env spécifie l'environnement, et donc quelle syntaxe est utilisée.
- `.gitignore`: dit à git de ne pas track ces fichiers.
- package-lock.json: spécifie à npm les dépendances du projet avec leur version précise. équivalent de pip freeze pour flask/django.
- `package.json`: spécifie à npm les dépendances du projet, mais aussi l'auteur, la license, le repo git... bref tout ce qui peut être intéressant pour [npm](https://www.npmjs.com/package/shitpost). Spécifie aussi les scripts à utiliser quand on utilise la commande `npm run (blablabla)`.
- `webpack.config.js`: config de webpack. C'est le seul fichier à utiliser une syntaxe non-ES6, car il est chargé par webpack avant toute transpilation de babel.


## Webpack et serveur

On utilise [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) pour servir l'application.

Il faut considérer que les fichiers de `/dist/` sont overwritten à chaque build de webpack. Donc ne jamais les modifier directement, ça ne sert à rien.

## Semantic UI

On utilise [semantic-ui-react](https://www.npmjs.com/package/semantic-ui-react) comme UI framework de React (i.e. est à css ce que React est à html). La documentation se trouve [ici](https://react.semantic-ui.com/). 

On a choisi d'importer les stylesheet par CDN au lieu de les télécharger dans le projet. Inconvénient : il faut avoir internet pour avoir accès aux stylesheet.

---

From https://react.semantic-ui.com/usage#content-delivery-network-cdn :

Content Delivery Network (CDN)

You can use the default Semantic UI stylesheet by including a Semantic UI CDN link in your index.html file.

This is the quickest way to get started with Semantic UI React. You won't be able to use custom themes with this method.

---

## ESLint

J'utilise l'extension ESLint de VS Code. La config est dans `.eslintrc.json`.

## React-Router

On utilise [react-router-dom](https://www.npmjs.com/package/react-router-dom) pour le routage (i.e. savoir quoi afficher pour quel path demandé). "-dom" signifie que c'est pour du développement web et pas mobile/tablette.

-[Présentation du principe de react-router](https://reacttraining.com/react-router/core/guides/philosophy/dynamic-routing)
-[La documentation](https://reacttraining.com/react-router/web/api/)

## Utilisation de graphQL

### On utilise quoi ?

GraphQL est une couche d'abstraction entre le front et le back permettant d'écrire des requêtes de données (du front vers le back) lisibles. 
http://graphql.org/learn/

On n'utilise pas graphql.js mais une autre implémentation appelée *apollo-client* : une implementation de graphQL "côté client". Rq: on utilise aussi [graphql-tag](https://www.npmjs.com/package/graphql-tag).

[La doc est ici](https://www.apollographql.com/docs/react/). (attention, le domaine apollographql.com contient la doc pour tous les modules d'*apollographql*, y compris des modules pour graphQL "côté serveur" ou pour d'autres frameworks que React... [mai 2018])

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


