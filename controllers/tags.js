var mongoose = require('mongoose'),
Tag = mongoose.model('Tag');

exports.findAll = function(req, res){
	Tag.find({},function(err, results) {
		return res.send(results);
  });
};