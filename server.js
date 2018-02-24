/*eslint-env node*/

const express = require('express');

const app = express();

app.use(express.static('./build/', {fallthrough: true}) );
app.use((req,res,next) => { res.sendFile('index.html', {root: './build/'}); });

app.listen(8888, () => {
    console.log( 'Express server listening on port %d in %s mode', 8888, app.settings.env );
});
