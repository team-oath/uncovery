var chai = require('chai');
var expect = chai.expect;
var models = require('../server/db/models');
var request = require('request');
var localServerUri = 'http://127.0.0.1:3000/';
var GETUri = localServerUri + '?x=100.123456&y=-50.323&z=14.4244';
var testData = {x: 100.123456, y: -50.323, z: 14.4244, message: 'hello database!'};

describe('server to database integration', function() {
  it('should persist valid POST request to database', function(done) {
    request.post({url:localServerUri, form: testData}, function(err, response, body) {
      models.retrieve(testData, function(messages) {
        var messageId = messages[0].messageId
        expect(Math.floor(messages[0].x)).to.equal(Math.floor(testData.x));
        done();
      });
    });
  });

  it('should GET messages from databases', function(done) {
    request(GETUri, function(err, response, body) {
      var messages = JSON.parse(response.body);
      expect(messages).to.be.a('array');
      done();
    });
  });
});
