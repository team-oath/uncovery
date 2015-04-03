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
  var testLocation = {
    x: 37.183549,
    y: -122.108974,
  };

  it('should validate user input', function(done) {
    models.insert(invalidTestData, function(msg) {
      expect(msg).to.equal('Could not insert new message: invalid input.');
      done();
    })
  });

  it('should add messages to the database', function(done) {
    models.insert(testData, function(msg) {
      expect(msg).to.equal('Successfully inserted new message and mark to database.');
      done();
    })
  });

  it('should retrieve messages from the database', function(done) {
    models.retrieve(testLocation, function(messages) {
      expect(messages).to.be.instanceof(Array);
      done();
    })
  });
});
