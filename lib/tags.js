var uuid = require('node-uuid'),
    db = require('./db'),
	joi = require('joi'),
    dynamo = db.DynamoDB,
    tableName = "Tags";

exports.findById = function(req, res){
  var params = { TableName : tableName, Key : { ID : req.params.id } };

  dynamo.getItem(params ,function(err, result) {
	if (err) return res.send(500, err);
    return res.send(result);
  });
};

exports.add = function (req, res) {
    var schema = {
      Name: joi.string().required(),
	  Path: joi.array().required()
    };
	
	joi.validate(req.body, schema, function (err, value) {
		if (err) return res.send(500, err);
		
		var params = { TableName : tableName, Item : req.body};
		params.Item.ID = uuid.v4();
		
		dynamo.putItem(params, function (err, results) {
			if (err) return res.send(500, err);
			return res.send(results);
		});
	});
};