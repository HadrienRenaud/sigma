[![pipeline status](https://gitlab.binets.fr/br/sigma-frontend/badges/master/pipeline.svg)](https://gitlab.binets.fr/br/sigma-frontend/commits/master)

Sigma _frontend_
===

Ce dépôt contient le code source _frontend_ (c'est-à-dire l'interface client) de Sigma, le successeur de Frankiz, un site étudiant permettant de gérer les groupes et les étudiants du plateau de Saclay.

Le projet pour le serveur back, c'est-à-dire l'API GraphQL et la base de données, se trouve à https://gitlab.binets.fr/br/sigma-backend.git .

Pour obtenir une copie du projet, cloner le dépôt par :
```bash
git clone git@gitlab.binets.fr:br/sigma-frontend.git
# ou
git clone https://gitlab.binets.fr/br/sigma-frontend.git
```

## Utilisation

Cloner le dépôt (cf. ci-dessus).

Installer les dépendances (spécifiées dans `package.json`):
```bash
npm install
```

Dire à webpack de build le projet (build le bundle `main.js` et mettre `index.html` à la racine du repo) :
```bash
npm run dev # en mode developpement 
# ou
npm run build # en mode production
```

Lancer un serveur webpack-dev-server :
```bash
npm run start #see (package.json).scripts
```
Comme indiqué dans `config.devServer` de webpack.config.js, ceci lance un serveur servant l'application compilée par webpack (build/bundle.js) sur le port 8888.

En fait, il me semble qu'il n'est pas nécessaire de build le projet avant d'utiliser webpack-dev-server ; donc on peut en fait directement lancer `npm run start` (à vérifier).
En tout cas, il n'est pas nécessaire de re-build le projet et de relancer webpack-dev-server à chaque modification du code source : il est configuré par défaut pour faire du "live-reload".


## Structure du dossier

La structure générale du projet est indiquée ci-dessous ; pour voir la structure du dossier `src/`, se reporter au [CONTRIBUTING](./CONTRIBUTING.md).

- `assets/`: on y met les fichiers statiques, comme les images.
- `build/`: les fichiers compilés par webpack. Ignoré par git (.gitignore)
- `examples/`: des fichiers exemples qu'on pourra utiliser comme templates pour écrire d'autres Component.
- `node_modules/`: les dépendances du dossier, téléchargées automatiquement par npm. Ignoré par git (.gitignore)
- `src/`: le code source du projet.

Divers fichiers de config à la racine du projet.
- `.babelrc`: config pour babel, le transpileur... transpilateur... bref le truc qui fait la traduction de ES6 vers des versions d'ECMAScript compréhensibles par les machines. Ici, [babel](https://www.npmjs.com/package/babel-loader) est utilisé comme un [*loader*](https://webpack.js.org/concepts/loaders/) par webpack.
- `.eslintignore`: dit à eslint de ne pas linter ces fichiers.
- `.eslintrc.json`: config pour eslint. Le plus susceptible d'être modifié est le champ rules. env spécifie l'environnement, et donc quelle syntaxe est utilisée.
- `.gitignore`: dit à git de ne pas track ces fichiers.
- `.gitlab-ci.yml`: **TODO: j'en ai aucune idée**
- `package-lock.json`: spécifie à npm les dépendances du projet avec leur version précise. équivalent de pip freeze pour flask/django.
- `package.json`: spécifie à npm les dépendances du projet, mais aussi l'auteur, la license, le repo git... bref tout ce qui peut être intéressant pour [npm](https://www.npmjs.com/package/shitpost). Spécifie aussi les scripts à utiliser quand on utilise la commande `npm run (blablabla)`.
- `webpack.config.js`: config de webpack. C'est le seul fichier à utiliser une syntaxe non-ES6, car il est chargé par webpack avant toute transpilation de babel.

## Dépendances

Les dépendances (i.e les packages *npm* utilisés dans le projet) sont spécifiées dans le `package.json`.

### Webpack

#### "Compilateur" et traducteur d'ES6
La syntaxe que nous avons adoptée est JavaScript ES6, un standard moderne (2015) de JavaScript que ni Node.js ni la plupart des navigateurs ne comprennent complètement. [Webpack](https://http://webpack.js.org/) traduit ES6 vers un standard plus ancien de Javascript, que Node.js comprend. En même temps qu'il traduit, Webpack effectue des optimisations dans le code. En bref, il joue le rôle d'un compilateur pour d'autres langages.

Utiliser ES6 permet d'écrire du code plus lisible par rapport aux standards précédents,  notamment d'importer des dépendances en utilisant le mot-clé `import`.

#### webpack-dev-server
Le serveur qu'on utilise pour servir l'application (en mode développement) s'appelle webpack-dev-server et est spécialement conçue pour servir des applications compilées par Webpack. 

TODO: comment utiliser webpack-dev-server

#### Utilisation
Webpack est configuré dans [`webpack.config.js`](../webpack.config.js). 

### ReactJS

"A JavaScript library for building user interfaces", créé par Facebook et open source. C'est assez connu quand même.
https://reactjs.org/docs/hello-world.html

On utilise également le paquet react-router-dom (voir CONTRIBUTING.md pour plus de précisions.)

#### .jsx
La syntaxe JavaScript utilisée est donc ES6 avec JSX (JavaScript React, une syntaxe spécial permettant d'incorporer facilement du HTML dans son code JavaScript pour définir des éléments React).

Un fichier .jsx se comporte comme un fichier .js, sauf que les commentaires *dans les parties HTML du code* doivent être écrites comme ça : `{/*mon commentaire*/}`

### Autres dépendances

cf. CONTRIBUTING.md. (Il y a notamment beaucoup de dépendances liées à l'utilisation de ReactJS.)



## Obtenir la documentation détaillée du projet

### L'outil JSDoc

La documentation détaillée du projet est [ici](./doc/index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format html selon le fichier de configuration [`configfile_doc.json`](./configfile_doc.json) à la racine du projet.

L'outil JSDoc cherche, dans tous les fichiers d'un dossier spécifié par le fichier de config `configfile_doc.json`](./configfile_doc.json), les 'balises' JSDoc de la forme
```javascript
/**
 * @file brève description du fichier
 * @author moi (celui qui écrit, pas le BRman)
 * @description une autre balise JSDoc
 * ...
 * /
```
puis les utilise, fichier par fichier et de façon bien ordonnée, pour générer automatiquement de la doc.

Les fichiers compilés se situent dans [`doc/`](./doc) avec leurs fichiers images. 

Par nature de JSDoc, il est facile de documenter en détail des fonctions, grâce aux balises `@descriptions`, `@params`, `@returns`, `@author` etc.
Il est plus compliqué de documenter un fichier, en général on se contente de balises `@file`, `@author` et de commentaires non balisés.

Dans le front, il n'y a quasiment pas de "fonctions", donc les choses particulièrement importantes à noter sont 
- la description du Component
- le path qui fait render ce Component
- réciproquement, à côté d'un ```<Route>```, dire où est défini le Component qui est rendered par le path concerné

### En pratique

La documentation détaillée du projet est [ici](index.html). Elle a été compilée avec [JSDoc](http://usejsdoc.org/index.html) sous format hmtl selon le fichier de configuration [`configfile_doc.json`](./configfile_doc.json) à la racine du projet.

Le script pour faire tourner [JSDoc](http://usejsdoc.org/index.html) et régénérer la documentation est : `npm run doc`. Les liens et images sont faits pour fonctionner en local, donc ne vous étonnez pas si vous avez des surprises en regardant ce README depuis git.

Les fichiers compilés se situent dans [`doc`](.) avec leurs fichiers image. Par nature de l'outil JSDoc il est facile de documenter en détail des fonctions .js mais plus compliqué de documenter un fichier.

A chaque execution JSDoc rajoute les commentaires placés dans chacun des fichiers dans la doc de façon structurée. Les notes en Markdown placés dans notes/ sont également rajoutées en tant que tutoriels (voir {@tutorial CONTRIBUTING}).
