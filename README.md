## Introduction

Ce dépôt contient le _frontend_ de Sigma, le nouveau Frankiz.

Pour obtenir une copie, clonez-le avec

    git clone git@gitlab.binets.fr:br/sigma-frontend

## Structure

La structure générale du projet est détaillée ci-dessous ; pas d'inquiétude, la plupart des fichiers .js(x) sont aussi extensivement documentés plus bas.

- Racine du projet : fichiers de configuration ;
    - config.json : données "sensibles" spécifique au projet à priori non partageable (adresse du LDAP, mots de passe),
    - configfile_doc.json : JSDoc, l'outil de génération automatique de documentation,
    - autres fichiers relatifs à des modules particuliers ou à la gestion de paquets,
    - [`assets`](./assets) : ressources ;
        - images et divers (dont l'essentiel flavicon)
    - [`build`](./build) : dépendances gérées automatiquement ;
        - bundle.js est un monstrueux fichier généré automatiquement qui gère nos dépendances.
    - [`doc`](./doc) : documentation ;
        - ensemble de pages html et fichiers associés ; index.html permet de naviguer sereinement sur toute la doc JSDoc.
    - [`node_modules`](./node_modules) : gestion automatique des modules.
    - [`src`](./src) : code source
        - [`main`](./src/main) : ?
            - [`event`](./src/main/event) : gestion des events
            - [`group`](./src/main/group) : ?
            - [`images`](./src/main/images) : ?
            - [`member`](./src/main/member) : ?

La syntaxe adoptée est JavaScript ES6, un standard moderne (2015) de JavaScript. Il permet d'importer des dépendances en utilisant le mot-clé `import`, ce que le serveur Node.js ne comprend pas puisque la version 8 de Node ne comprend que le standard ES5 (2009), qui gère les imports avec `require()`.

Le _frontend_ est codé à l'aide de ReactJS et Semantic UI.

Le standard JavaScript utilisé est ES6.

Les fichiers source `.jsx` de l'app React se situent dans `src`, et le point d'entrée est [`main.js`](./main.js).

La compilation de `main.js` est ses dépendances dans `src` se fait avec Webpack, qui est configuré dans [`webpack.config.js`](./webpack.config.js).

La structure générale du projet est détaillée ci-dessous ; pas d'inquiétude, la plupart des fichiers .js sont aussi extensivement documentés plus bas.

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

## Documentation

La documentation détaillée du projet est [ici](./doc/index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format hmtl selon le fichier de configuration [`configfile_doc.json`](./configfile_doc.json) à la racine du projet.

Les fichiers compilés se situent dans [`doc`](./doc) avec leurs fichiers image. Par nature de l'outil JSDoc il est facile de documenter en détail des fonctions .js mais plus compliqué de documenter un fichier.

A la fin de ce fichier JSDoc rajjoute les commentaires placés dans chacun des fichiers et des hyperliens pour y accéder.

## Appendixes

### ESLint

On utilisera ESLint pour standardiser le code : un ensemble de règles de style pour le code sont appliquées, et quelques-unes d'entre elles sont dans le fichier `.eslintrc.json`. Pour l'instant, la config ESLint impose d'utiliser quatre espaces pour les indentations et d'utiliser des points-virgule en fin de ligne.

Il est préférable de l'installer **globalement** avec `npm install -g eslint`. Pour faire valider les fichiers source par ESLint, utilisez `npm run lint`.

qui fait appel au script `eslint src/` défini dans le [`package.json`](./package.json). L'option `--fix` permet de corriger les fichiers.

Sinon, si vous utilisez Atom ou Visual Studio Code pour éditer votre code, il existe des plugins qui font tourner ESLint en _live_ sur le code et vérifient que tout est en ordre.

Pour mieux comprendre ESLint, référez-vous à la [doc](https://eslint.org/docs/user-guide/getting-started).