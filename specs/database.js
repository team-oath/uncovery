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
    x: 42.938233,
    y: -160.423029
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

  it('should retrieve an array of messages from the database', function(done) {
    models.retrieve(testData, function(messages) {
      expect(messages).to.be.instanceof(Array);
      done();
    })
  });

  it('should retrieve messages that are near the user', function(done) {
    models.retrieve(testData, function(messages) {
      expect(messages).to.be.not.empty;
      done();
    })
  });

  it('should not retrieve messages that are not near the user', function(done) {
    models.retrieve(testLocation, function(messages) {
      expect(messages).to.be.empty;
      done();
    })
  });
});
