var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config');
var models = require('../server/db/models');

describe('database storage', function() {
  var testData = {
    x: 37.783599,
    y: -122.408974,
    z: 69,
    message: 'Brooks was here'
  };
  var invalidTestData = {
    x: 37.783599,
    y: -122.408974,
    z: 69
  };

  it('should validate user input', function(done) {
    models.insert(invalidTestData, function(err, msg) {
      expect(err).to.equal('Could not insert new message: invalid input.');
      done();
    })
  });

  it('should add messages to the database', function(done) {
    models.insert(testData, function(err, msg) {
      expect(msg).to.equal('Successfully inserted new message to database.');
      done();
    })
  });
});
