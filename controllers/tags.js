
exports.findAll = function(req, res){
	var results = [{"name" : "Tag1"}, {"name" : "Tag2"}];
	res.send(results);
};