var proxyquire = require('proxyquire'),
    chai = require("chai"),
    sinonChai = require("sinon-chai"),
    expect = chai.expect,
    tags;

chai.use(sinonChai);

describe('The tags controller', function () {
    var mongooseStub,
        testTags = [{"Name": "Tag1"}, {"Name": "Tag2"}];

    before(function () {
        mongooseStub = {
            model: function () {
                return {
                    find: function (query, callback) {
                        callback(null, testTags);
                    }
                };
            }
        };

        tags = proxyquire('../controllers/tags.js', {mongoose: mongooseStub});
    })

    it('should return all tags', function (done) {
        var req = {};

        var res = {
            send: function (results) {
                expect(results).to.eq(testTags);
            }
        };

        tags.findAll(req, res, done());
    })
})
