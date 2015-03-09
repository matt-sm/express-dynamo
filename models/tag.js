var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
});

mongoose.model('Tag', TagSchema);