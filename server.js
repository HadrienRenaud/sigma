/*eslint-env node*/

const path = require('path');
const express = require('express');

const app = express();

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

app.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
