module.exports = function(app){

	var tags = require('./controllers/tags');

	app.get('/tags', tags.findAll); 
	app.get('/tags/:id', tags.findById); 
	app.put('/tags/:id', tags.update);
	app.post('/tags', tags.add);
	app.delete('/tags/:id', tags.delete);
	app.get('/import', tags.import);  

	app.get('/ping', function(req, res) {
	    res.send('pong');
	});

};