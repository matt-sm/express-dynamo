var proxyquire = require('proxyquire'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect;

describe('Tags', function () {
	describe('FindById', function () {
    it('should return a tag when passed a valid Id', function (done) {
        var res = {},
		    testId = "Test-Id",
		    req = { params : { id : testId}}
            sendSpy = res.send = sinon.spy(),
            testTag = {"Item": { "Name": "tag2", "ID": testId, "Path": ["path1", "path2"] }},
            getItemStub = sinon.stub().yields(null, testTag),
            dbStub = { DynamoDB: function () { return {getItem: getItemStub}}};

        var tags = proxyquire('../lib/tags', {'dynamodb-doc': dbStub});

        tags.findById(req, res, done());
		
        expect(getItemStub.calledOnce).to.equal(true);
		expect(getItemStub.getCall(0).args[0].Key.ID).to.equal(testId);
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.calledWith(testTag)).to.equal(true);
    })
})
})

describe('Tags', function () {
	describe('FindById', function () {
    it('should return a 500 when passed an invalid Id', function (done) {
        var res = err = {},
		    req = { params : { id : "xxx"}}
            sendSpy = res.send = sinon.spy(),
            getItemStub = sinon.stub().yields(err, null),
            dbStub = { DynamoDB: function () { return {getItem: getItemStub}}};

        var tags = proxyquire('../lib/tags', {'dynamodb-doc': dbStub});

        tags.findById(req, res, done());
		
        expect(getItemStub.calledOnce).to.equal(true);
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.calledWith(500, err)).to.equal(true);
    })
})
})
