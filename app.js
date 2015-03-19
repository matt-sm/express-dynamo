var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

require('./lib/routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');