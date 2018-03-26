# Sigma _frontend_

[![pipeline status](https://gitlab.binets.fr/br/sigma-frontend/badges/master/pipeline.svg)](https://gitlab.binets.fr/br/sigma-frontend/commits/master)



## Introduction

Ce dépôt contient le code source _frontend_ (c'est-à-dire l'interface client) de Sigma, le nouveau Frankiz.

Pour obtenir une copie, clonez-le avec

    git clone git@gitlab.binets.fr:br/sigma-frontend



## Installation

Pour faire tourner le code, il faut

* installer les dépendances npm
* compiler les fichiers source en `build/bundle.js`

Pour ce faire, des scripts npm sont définis dans le [`package.json`](./package.json).

* `npm install` installe les dépendances
* `npm run build` compile les fichiers source *pour la production* avec [Webpack](https://webpack.js.org/) (version 4) ; un ensemble d'optimisations pour les navigateurs sont effectuées au passage
  * avec la version et la configuration actuelle de webpack 4, cette commande ne fonctionne apparemment pas pour le développement
* `npm run dev` lance un serveur de développement Webpack :
  * les fichiers source sont automatiquement recompilés lorsqu'une modification des fichiers source est faite
  * l'application est disponible à localhost:8888

### Remarques sur Webpack

La version de Webpack utilisée est Webpack 4.1, nouvelle version datant de 2018 et incorporant des optimisations à la compilation pour la rendre plus rapide.

Le serveur de développement [webpack-serve](https://github.com/webpack-contrib/webpack-serve), successeur plus léger et moderne de [webpack-dev-server](https://github.com/webpack-contrib/webpack-dev-server).

**TODO:** plus de précisions sur son utilisation et sa config actuelle



## Structure

La structure générale du projet est détaillée ci-dessous ; pour voir la structure du dossier `src/`, se reporter au [README_DEV](./README_DEV.md).

* __[Racine](../)__ du projet : fichiers de configuration
  * `configfile_doc.json` : config pour *JSDoc*, l'outil de génération automatique de documentation
  * `package.json` : config pour *npm*, spécifiant les dépendances (mais aussi les scripts appelés par 'npm run [machin]', et d'autres trucs)
  * `package-lock.json` : comme package.json mais avec les dépendances explicitées (avec la version exacte et l'adresse d'import, entre autres). Auto-généré par *npm*
  * `semantic.json` : config pour *Semantic UI React*
  * `webpack.config.js` : config pour *Webpack*, le compilateur, gestionnaire de dépendances, traducteur de ES6 et déployeur intégré. C'est dans ce fichier que se concentre toute la magie noire de *Webpack*. _**TODO:** en vrai seul wilson sait à peu près comment ça marche, c'est pas génial comme situation_
  * des fichiers de config pour *git* et *ESLint*
  * `README.md` : le fichier que tu es en train de lire
  * `README_DEV.md` : un fichier readme destiné aux développeurs (et aussi aux mainteneurs) de sigma
  * `index.html` : le fichier qui est servi in fine par le serveur. _**TODO:** comment ca marche, avec Webpack 4 ? qui appelle/renvoie à quoi ?_
  * `favicon.ico` : l'essence d'un site web ;) _**TODO:** comment ca marche avec Webpack 4 : faut-il mettre ce fichier à la racine ou dans src/assets ?_
  * ~~__`build`__ : fichiers générés par *Webpack*~~
    * ~~`bundle.js` : un fichier monstrueux généré automatiquement par *Webpack* à partir de notre code src, qui gère tout seul les dépendances.~~
    * **EDIT:** ce n'est plus le cas depuis qu'on est passe à Webpack 4, qui apparemment build et sert dans la foulée
  * __[`doc/`](./doc)__ : documentation générée par *JSdoc*
      * un ensemble relativement fouillis de pages html et fichiers associés
      * `index.html` : permet de naviguer sereinement sur toute la doc JSDoc
  * __[`node_modules/`](./node_modules)__ : dossier où sont téléchargées les dépendances.
  * __[`semantic/`](./semantic)__ : fichiers de config de *Semantic UI React*
  * __[`src/`](./src)__ : fichiers source
    * __[`assets/`](./assets)__ : ressources
      * images et divers fichiers utilisés par le front (dont l'essentielle favicon)
    * __[`main/`](./src/main)__ : composants React. voir le [README_DEV](./README_DEV.md) pour sa structure
    * `App.jsx` : point d'entrée de *Webpack*. voir le [README_DEV](./README_DEV.md)



## Packages et dépendances

### Reactjs

**TODO** mais enfin c'est assez connu quand même

### webpack _(**TODO:** pas fini) (@will?)_

#### traducteur d'ES6
La syntaxe que nous avons adoptée est JavaScript ES6, un standard moderne (2015) de JavaScript. Il permet d'importer des dépendances en utilisant le mot-clé `import`, ce que ni Node.js ni la plupart des navigateurs ne comprennent complètement (NodeJS n'est parfaitement compatible qu'avec la gestion CommonJS des modules via `require()`).

#### compilateur
Les fichiers source `.jsx` de l'app React se situent dans `src`, et le point d'entrée est [`App.jsx`](../App.jsx), qui redirige directement vers [`Main.jsx`](../Main.jsx)

La compilation de `Main.js` est ses dépendances dans `src` se fait avec Webpack, qui est configuré dans [`webpack.config.js`](../webpack.config.js).

### semantic-ui-react

Le _frontend_ est une application React avec des composants Semantic UI. La syntaxe JavaScript utilisée est donc ES6, avec JSX (JavaScript React, une syntaxe spécial permettant d'incorporer facilement du HTML dans son code JavaScript pour définir des éléments React).

Il existe deux implémentations différentes de SemanticUI avec React, une native Semantic et une autre qui fait le lien entre React et Semantic directement, nous avons choisi la deuxième. La doc se trouve [ici](https://react.semantic-ui.com/).

### apollo (graphQL)

**TODO**

La documentation de React et Apollo est disponible sur les sites respectifs.

## Outils de développement

### JSDoc pour la documentation

La documentation détaillée du projet est [ici](./doc/index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format html selon le fichier de configuration [`configfile_doc.json`](./configfile_doc.json) à la racine du projet.

L'outil JSDoc cherche dans tous les fichiers d'un dossier qu'on lui spécifie dans le fichier de config `configfile_doc.json`](./configfile_doc.json), ici la racine du projet, les 'balises' JSDoc de la forme
```javascript
/**
 * @file brève description du fichier
 * @author moi
 * @description une autre balise JSDoc
 * /
```
puis les utilise, fichier par fichier et de façon bien ordonnée, pour générer automatiquement de la doc.

_**TODO:** est-ce bien comme ca que ca s'appelle? des balises JSDoc? :pensive:_

Les fichiers compilés se situent dans [`doc/`](./doc) avec leurs fichiers images. Par nature de JSDoc, il est facile de documenter en détail des fonctions .js mais plus compliqué de documenter un fichier.


### ESLint

On utilisera ESLint pour standardiser le code : un ensemble de règles de style pour le code sont appliquées, et quelques-unes d'entre elles sont dans le fichier `.eslintrc.json`. Pour l'instant, la config ESLint impose d'utiliser quatre espaces pour les indentations et d'utiliser des points-virgule en fin de ligne.

Il est préférable de l'installer **globalement** avec `npm install -g eslint`. Pour faire valider les fichiers source par ESLint, utilisez `npm run lint`.

qui fait appel au script `eslint src/` défini dans le [`package.json`](../package.json). L'option `--fix` permet de corriger les fichiers.

Sinon, si vous utilisez Atom ou Visual Studio Code pour éditer votre code, il existe des plugins qui font tourner ESLint en _live_ sur le code et vérifient que tout est en ordre.

Pour mieux comprendre ESLint, référez-vous à la [doc](https://eslint.org/docs/user-guide/getting-started).


### Outils de test in-browser

Installer le plugin _React dev tools_ dans son navigateur (Chrome, Firefox, Safari) peut être une bonne idée pour inspecter les éléments React au sein d'une page.



## Documentation

La documentation détaillée du projet est [ici](./doc/index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format html selon le fichier de configuration [`configfile_doc.json`](./configfile_doc.json) à la racine du projet.

## Conclusion

contacts : contacter le BR (2016)

license, droits de copie, blablabla

chauffez-vous, mythe ALC etc.

