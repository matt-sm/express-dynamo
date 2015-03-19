module.exports = function (app) {

    var tags = require('./tags');

	app.get('/tags/:id', tags.findById);
	app.post('/tags', tags.add);
    app.get('/ping', function (req, res) {
        res.send('pong');
    });
};