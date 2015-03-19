var AWS = require("aws-sdk"),
	DOC = require("dynamodb-doc");

AWS.config.loadFromPath('config.json');

exports.DynamoDB = new DOC.DynamoDB();
