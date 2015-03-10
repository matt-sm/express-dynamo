var mongoose = require('mongoose'),
Tag = mongoose.model('Tag');

exports.findAll = function(req, res){
  Tag.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Tag.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Tag.update({'_id':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('Updated %d Tags', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Tag.create(req.body, function (err, Tag) {
    if (err) return console.log(err); 
    return res.send(Tag);
  });
};
