# Sigma _frontend_

[![pipeline status](https://gitlab.binets.fr/br/sigma-frontend/badges/master/pipeline.svg)](https://gitlab.binets.fr/br/sigma-frontend/commits/master)

## Introduction

Ce dépôt contient le code source _frontend_ (c'est-à-dire l'interface client) de Sigma, le nouveau Frankiz.

Pour obtenir une copie, clonez-le avec

    git clone git@gitlab.binets.fr:br/sigma-frontend

## Structure

La structure générale du projet est détaillée ci-dessous ; pas d'inquiétude, la plupart des fichiers .js(x) sont aussi extensivement documentés plus bas.

* Racine du projet : fichiers de configuration ;
  * config.json : données "sensibles" spécifique au projet à priori non partageable (adresse du LDAP, mots de passe),
  * configfile_doc.json : JSDoc, l'outil de génération automatique de documentation,
  * autres fichiers relatifs à des modules particuliers ou à la gestion de paquets,
  * [`assets`](../assets) : ressources ;
    * images et divers (dont l'essentielle favicon)
  * ~~ [`build`](../build) : dépendances gérées automatiquement ; ~~
    * ~~ bundle.js est un monstrueux fichier généré automatiquement qui gère nos dépendances. ~~
    * ==EDIT:== ce n'est plus le cas depuis qu'on est passe à webpack 4, qui build et sert dans la foulée
  * [`doc`](../doc) : documentation ;
      * ensemble de pages html et fichiers associés ; `index.html` permet de naviguer sereinement sur toute la doc JSDoc.
  * [`node_modules`](../node_modules) : dossier où sont téléchargées les dépendances.
  * [`src`](../src) : fichiers source
    * [`main`](../src/main) - composants React
      * [`event`](../src/main/messages) - composants relatifs aux messages
      * [`group`](../src/main/group) - relatif aux groupes :
      * [`images`](../src/main/images) : ?
      * [`member`](../src/main/member) : ?

## Syntaxe, packages et dépendances

La syntaxe adoptée est JavaScript ES6, un standard moderne (2015) de JavaScript. Il permet d'importer des dépendances en utilisant le mot-clé `import`, ce que ni Node.js ni la plupart des navigateurs ne comprennent complètement (NodeJS n'est parfaitement compatible qu'avec la gestion CommonJS des modules via `require()`).

Le _frontend_ est une application React avec des composants Semantic UI. La syntaxe JavaScript utilisée est donc ES6, avec JSX (JavaScript React, une syntaxe spécial permettant d'incorporer facilement du HTML dans son code JavaScript pour définir des éléments React).

Il existe deux implémentations différentes de SemanticUI avec React, une native Semantic et une autre qui fait le lien entre React et Semantic directement, nous avons choisi la deuxième. La doc se trouve [ici](https://react.semantic-ui.com/).

La documentation de React et Apollo est disponible sur les sites respectifs.

Les fichiers source `.jsx` de l'app React se situent dans `src`, et le point d'entrée est [`App.jsx`](../App.jsx), qui redirige directement vers [`Main.jsx`](../Main.jsx)

La compilation de `Main.js` est ses dépendances dans `src` se fait avec Webpack, qui est configuré dans [`webpack.config.js`](../webpack.config.js).

## Installation

Pour faire tourner le code, il faut

* installer les dépendances npm
* compiler les fichiers source en `build/bundle.js`

Pour ce faire, des scripts npm sont définis dans le [`package.json`](./package.json).

* `npm install` installe les dépendances
* `npm run build` compile les fichiers source avec [Webpack](https://webpack.js.org/) (version 4, datant de 2018) pour la *production* : un ensemble d'optimisations pour les navigateurs sont effectuées
  * avec la version et la configuration actuelle de webpack 4, cette commande ne fonctionne pas. Ce n'est pas grave : pour le développement, utiliser directement `npm run dev`
* `npm run dev` lance un serveur de développement Webpack :
  * les fichiers source sont automatiquement recompilés lorsqu'une modification des fichiers source est faite
  * l'application est disponible à localhost:8888

### Remarques sur Webpack

La version de Webpack utilisée est Webpack 4.1, nouvelle version datant de 2018 et incorporant des optimisations à la compilation pour la rendre plus rapide.

Le serveur de développement [webpack-serve](https://github.com/webpack-contrib/webpack-serve), successeur plus léger et moderne de [webpack-dev-server](https://github.com/webpack-contrib/webpack-dev-server).

## Documentation

La documentation détaillée du projet est [ici](./index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format hmtl selon le fichier de configuration [`configfile_doc.json`](../configfile_doc.json) à la racine du projet.

Les fichiers compilés se situent dans [`doc`](.) avec leurs fichiers image. Par nature de l'outil JSDoc il est facile de documenter en détail des fonctions .js mais plus compliqué de documenter un fichier.

A la fin de ce fichier JSDoc rajjoute les commentaires placés dans chacun des fichiers et des hyperliens pour y accéder.

## Appendixes

### ESLint

On utilisera ESLint pour standardiser le code : un ensemble de règles de style pour le code sont appliquées, et quelques-unes d'entre elles sont dans le fichier `.eslintrc.json`. Pour l'instant, la config ESLint impose d'utiliser quatre espaces pour les indentations et d'utiliser des points-virgule en fin de ligne.

Il est préférable de l'installer **globalement** avec `npm install -g eslint`. Pour faire valider les fichiers source par ESLint, utilisez `npm run lint`.

qui fait appel au script `eslint src/` défini dans le [`package.json`](../package.json). L'option `--fix` permet de corriger les fichiers.

Sinon, si vous utilisez Atom ou Visual Studio Code pour éditer votre code, il existe des plugins qui font tourner ESLint en _live_ sur le code et vérifient que tout est en ordre.

Pour mieux comprendre ESLint, référez-vous à la [doc](https://eslint.org/docs/user-guide/getting-started).

### Note concernant react-router

Ne rien importer depuis react-router (le core de react router), mais depuis *react-router-dom* (le package dedie aux sites web). (BrowserRouter, Route, Link, NavLink...) En effet certains Component existent dans les deux mais avec quelques differences.

### Outils de test

Installer le plugin _React dev tools_ dans son navigateur (Chrome, Firefox, Safari) peut être une bonne idée pour inspecter les éléments React au sein d'une page.

Pour developper et tester les minimodules : il faut restreindre le caca au dossier src/main/index. Donc par exemple, creer un sous-dossier "monMinimodule" avec dedans "MonMinimodule.jsx" et l'importer dans Index.jsx
:::info
Merci de creer une branche git pour chaque minimodule
:::

