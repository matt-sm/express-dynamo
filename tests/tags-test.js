var proxyquire = require('proxyquire'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    tags = require("../controllers/tags");

describe('The tags controller', function () {
    it('should return all tags', function (done) {
		var req,res,spy,results;

        req = res = {};
        spy = res.send = sinon.spy();
		results = [{"name" : "Tag1"}, {"name" : "Tag2"}];

        tags.findAll(req, res, done());

        expect(spy.calledOnce).to.equal(true);
		expect(spy.calledWith(results)).to.equal(true);
    })
})
