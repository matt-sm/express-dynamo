var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

require('./db');
require('./models/tag');
require('./routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');