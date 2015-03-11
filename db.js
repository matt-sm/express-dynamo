var mongoose = require('mongoose'),
mongoUri = 'mongodb://localhost:27017/noderest';

mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});