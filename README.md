# Frontend sigma

Ce dépôt contient le _frontend_ de Sigma, le nouveau Frankiz.

Pour obtenir une copie, clonez-le avec

    git clone git@gitlab.binets.fr:br/sigma-frontend

## Installation

Les dépendances s'installent avec

    npm install

On utilise Webpack pour transpiler le code JavaScript (les fichiers React et `main.js`) en un fichier `build/bundle.js`, via la commande

    npm run build

Ensuite, `npm run serve` démarre un serveur Express servant l'application à l'adresse https://localhost:8888.

### Makefile

Pour simplifier les choses, le Makefile installe les dépendances, transpile le code et démarre un serveur Express.

Pour installer les dépendances et compiler,

    make -f setup

ou juste `make` (`mingw32-make` avec Git Bash sous Windows).