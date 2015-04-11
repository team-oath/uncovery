var moment = require('moment');
var geolib = require('geolib');
var fs = require('fs');

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
  return dist + 'm';
};

// The object we pull from the database has specific data (time/location)
// Here we create a new object that has data that is relevant to the user
exports.createResponseObjects = function(marks, user) {
  var responseObjects = [];
  var responseObject;

  marks.forEach(function(mark) {
    responseObject = {
      messageId: mark.messageId,
      timestamp: exports.getTimeElapsedSince(mark.timestamp),
      distance: exports.getDistanceFrom(mark, user),
      messageString: mark.messageString,
      votes: mark['COUNT(votes.id)'],
      comments: mark['COUNT(comments.id)'],
      score: mark.score
    };
    responseObjects.push(responseObject);
  });

  return responseObjects;
};

exports.saveImage = function(img64, filename, callback) {
  var base64Data = img64.replace(/^data:image\/jpg;base64,/, '');
  filename = './server/images/' + filename + '.jpg';

  fs.writeFile(filename, base64Data, 'base64', function(err) {
    if (err) console.log(err);
    callback();
  });
};

exports.log = function(message, content) {
  console.log('-------------------------------------------------------------------');
  console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  console.log(message);
  console.log(content);
};
