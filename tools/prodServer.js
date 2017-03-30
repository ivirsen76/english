const express = require('express');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../dist/')));

// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(port);

console.log(`Server started on: http://localhost:${port}`);
