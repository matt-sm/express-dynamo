var proxyquire = require('proxyquire'),
    sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect;

describe('Tags', function () {
    var res, req, err, sendSpy, testId, testTag, getItemStub, dbStub;

    beforeEach(function(done){
        res = err = {},
        testId = "Test-Id",
        req = {params: {id: testId}},
        sendSpy = res.send = sinon.spy(),
        testTag = {"Item": {"Name": "tag2", "ID": testId, "Path": ["path1", "path2"]}},
        dbStub = {
            DynamoDB: function () {
                return {getItem: getItemStub}
            }
        };

        done();
    })

    describe('FindById', function () {
        it('should return a tag', function (done) {
            getItemStub = sinon.stub().yields(null, testTag);

            var tags = proxyquire('../lib/tags', {'dynamodb-doc': dbStub});

            tags.findById(req, res, done());

            expect(getItemStub.calledOnce).to.equal(true);
            expect(getItemStub.getCall(0).args[0].Key.ID).to.equal(testId);
            expect(sendSpy.calledOnce).to.equal(true);
            expect(sendSpy.calledWith(testTag)).to.equal(true);
        })
    })

    describe('FindById', function () {
        it('should return a 404 when id not found', function (done) {
            getItemStub = sinon.stub().yields(null, {});

            var tags = proxyquire('../lib/tags', {'dynamodb-doc': dbStub});

            tags.findById(req, res, done());

            expect(getItemStub.calledOnce).to.equal(true);
            expect(sendSpy.calledOnce).to.equal(true);
            expect(sendSpy.calledWith(404)).to.equal(true);
        })
    })

    describe('FindById', function () {
        it('should return a 500 when err', function (done) {
            getItemStub = sinon.stub().yields(err, null);

            var tags = proxyquire('../lib/tags', {'dynamodb-doc': dbStub});

            tags.findById(req, res, done());

            expect(getItemStub.calledOnce).to.equal(true);
            expect(sendSpy.calledOnce).to.equal(true);
            expect(sendSpy.calledWith(500, err)).to.equal(true);
        })
    })
})
