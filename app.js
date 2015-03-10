var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

var mongoUri = 'mongodb://localhost:27017/noderest';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

app.use(bodyParser.json());

require('./models/tag');
require('./routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');