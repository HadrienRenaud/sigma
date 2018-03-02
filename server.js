/*eslint-env node*/

const favicon = require('serve-favicon');
const path = require('path');

const express = require('express');

const app = express();

// serving static files
app.use(express.static('./build', {fallthrough: true}));
app.use(express.static('./src/assets'));

// favicon
app.use(favicon(path.resolve('./', 'src', 'assets', 'favicon.ico')));
app.use((req,res,next) => { res.sendFile('./build/index.html', {root: './build/'}); });

const port = process.env.NODE_PORT || 8888;


app.listen(port, () => {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
