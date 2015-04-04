var moment = require('moment');
var geolib = require('geolib');

// Use moment.js to calculate how much time has elapsed since some prior time
exports.getTimeElapsedSince = function(time) {
  return moment(time).fromNow();
};

// Use geolib.js to calculate distance from the mark to the user
exports.getDistanceFrom = function(mark, user) {
  var dist = geolib.getDistance(
    {latitude: user.x, longitude: user.y},
    {latitude: mark.x, longitude: mark.y}
  );
  return dist + ' meters away';
};

// The object we pull from the database has specific data (time/location)
// Here we create a new object that has data that is relevant to the user
exports.createResponseObjects = function(marks, user) {
  var responseObjects = [];
  var responseObject;

  marks.forEach(function(mark) {
    responseObject = {
      timestamp: exports.getTimeElapsedSince(mark.timestamp),
      distance: exports.getDistanceFrom(mark, user),
      messageString: mark.messageString
    };
    responseObjects.push(responseObject);
  });

  return responseObjects;
};
