module.exports = function (app) {

    var tags = require('./controllers/tags');

    app.get('/tags', tags.findAll);

    app.get('/ping', function (req, res) {
        res.send('pong');
    });

};