var uuid = require('node-uuid'),
    DOC = require("dynamodb-doc"),
    joi = require('joi'),
    tableName = "Tags";

var dynamo = new DOC.DynamoDB();

exports.findById = function (req, res) {
    var params = {TableName: tableName, Key: {ID: req.params.id}};

    dynamo.getItem(params, function (err, result) {
        if (err) return res.send(500, err);
        if (result && !result.Item) return res.send(404);
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

        var params = {TableName: tableName, Item: req.body};
        params.Item.ID = uuid.v4();

        dynamo.putItem(params, function (err, results) {
            if (err) return res.send(500, err);
            return res.send(results);
        });
    });
};