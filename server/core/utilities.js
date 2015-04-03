var moment = require('moment');

// Use moment.js to calculate how much time has elapsed since some prior time
exports.getTimeElapsedSince = function(time) {
  return moment(time).fromNow();
};

// Use basic geometry to calculate distance from the mark to the user
exports.getDistanceFrom = function(mark, user) {
  var feetPerDegree = 364829;
  var dx = user.x - mark.x;
  var dy = user.y - mark.y;
  var dz = Math.pow((dx*dx + dy*dy), 0.5)
  return Math.floor(dz * feetPerDegree) + ' feet away';
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
