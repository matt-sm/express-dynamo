var proxyquire = require('proxyquire'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect;

describe('The tags controller', function () {
    it('should return a tag', function (done) {
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
