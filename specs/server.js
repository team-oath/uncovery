var chai = require(['chai']);
var expect = chai.expect;
var request = require(['request']);

describe('server', function(){ 
  it('should fail', function() {
    request('localhost:9876', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the Google homepage.
        }
    });
  });
});
