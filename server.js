/*eslint-env node*/

const path = require('path');
const express = require('express');
//const favicon =require('serve-favicon');

const app = express();

// favicon: capital sigma symbol
//app.use(favicon(path.resolve('./', 'assets', 'favicon.ico')));

// serving static files
app.use(express.static('./build', 
    { 
        fallthrough: true,
        //index: "index.html" // already by default
    }
));

//app.use((req, res, next) => { res.sendFile('./build/index.html', { root: './build/' }); });
// ^ unnecessary since express.static automatically sends build/index.html (by default)

const port = process.env.NODE_PORT || 8888;

// redirect all of your server requests to /index.html.
// Any request that is made to your server will respond with the index page (and then fetch any JS resources you need), React Router will then take over and load the appropriate view
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// La methode recommandee est de set devServer{ historyApiFallback: true } dans le webpack.config.json, mais
// ca ne marche qu'avec webpack-dev-server.
// Avec cette methode ca marche pas vraiment... quand on entre "[baseurl]/bar" c'est bien redirected,
// mais pas avec "[baseurl]/foo/bar"...
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
