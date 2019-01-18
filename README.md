shitpost, l'aspirateur à caca
===

shitpost est une application pour aspirer le shitpost des forums. Par exemple, à terme, un Message sur Frankiz sera dupliqué sur shitpost et les gens pourront commenter du shitpost dessus au lieu de shitposter directement sur Frankiz (d'ailleurs le nouveau Frankiz n'aura pas de système de commentaires).

jk. shitpost est un projet jouet pour me familiariser avec webpack, React.js, GitLab, etc. Peu de chances, en tout cas pour l'instant, que ça aboutisse à quoi que ce soit.

Je m'inspire notamment de https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
https://www.valentinog.com/blog/webpack-4-tutorial/
https://www.howtographql.com/react-apollo/1-getting-started/
https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b (tuto en 8 parties)

Le projet pour le serveur back, c'est-à-dire l'API GraphQL et la base de données devrait se trouver pas loin (probablement ../api.shitpost).

## Utilisation

Cloner le dépôt :
```bash
git clone git@gitlab.binets.fr:guillaume.wang/shitpost.git
```

Installer les dépendances (spécifiées dans `package.json`):
```bash
npm i
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
Comme indiqué dans `config.devServer` de webpack.config.js, ceci lance un serveur servant l'application compilée par webpack (dist/main.js) sur le port 9000.

En fait, il me semble qu'il n'est pas nécessaire de build le projet avant d'utiliser webpack-dev-server ; donc on peut en fait directement lancer `npm run start` (à vérifier).
En tout cas, il n'est pas nécessaire de re-build le projet et de relancer webpack-dev-server à chaque modification du code source : il est configuré par défaut pour faire du "live-reload".
