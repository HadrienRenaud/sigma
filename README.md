# Frontend sigma

Ce dépôt contient le _frontend_ de Sigma, le nouveau Frankiz.

Pour obtenir une copie, clonez-le avec

    git clone git@gitlab.binets.fr:br/sigma-frontend

## Structure

Le _frontend_ est codé à l'aide de Semantic UI, React et Apollo(GraphQL) pour faire le lien avec le back et GraphQL.

Le standard JavaScript utilisé est ES6.

Il existe deux implémentations différentes de SemanticUI avec React, une native Semantic et une autre qui fait le lien entre React et Semantic directement, nous avons choisi la deuxième. La doc se trouve à : https://react.semantic-ui.com/.

La documentation de React et Apollo est disponible sur les sites respectifs.

Les fichiers source `.jsx` de l'app React se situent dans `src`, et le point d'entrée est [`App.jsx`](./App.jsx), qui redirige directement vers [`Main.jsx`](./Main.jsx)

La compilation de `Main.js` est ses dépendances dans `src` se fait avec Webpack, qui est configuré dans [`webpack.config.js`](./webpack.config.js).

## Installation

Pour faire tourner le code, il faut

* installer les dépendances npm
* compiler les fichiers source en `build/bundle.js`

Des scripts npm sont configurés dans [`package.json`](./package.json), et un [makefile](./Makefile) est fourni.

### Simple: Makefile

Pour simplifier les choses, le Makefile installe les dépendances et transpile le code.

Pour installer les dépendances et compiler,

    make setup

ou juste `make` (`mingw32-make` avec Git Bash sous Windows).

Ensuite, `make run` démarre le serveur Express.

### Scripts npm

* `npm install` installe les dépendances
* `npm run build` compile la source avec Webpack
* `npm run watch` lance Webpack avec le flag `--watch` et recompile lorsqu'un fichier est modifié

Ensuite, `npm start` démarre un serveur Express servant l'application à l'adresse http://localhost:8888.