var proxyquire = require('proxyquire'),
    sinon = require("sinon"),
    chai = require("chai"),
    mongoose = require('mongoose'),
    expect = chai.expect;

describe('The tags controller', function () {
    it('should return all tags', function (done) {
        var req = res = {},
            sendSpy = res.send = sinon.spy(),
            testTags = [{"name": "Tag1"}, {"name": "Tag2"}],
            findStub = sinon.stub().yields(null, testTags),
            mongooseStub = {
                model: function () {
                    return {find: findStub}
                }
            };

        var tags = proxyquire('../controllers/tags', {'mongoose': mongooseStub});

        tags.findAll(req, res, done());

        expect(findStub.calledOnce).to.equal(true);
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.calledWith(testTags)).to.equal(true);
    })
})
