var moment = require('moment');
var geolib = require('geolib');
var shortid = require('shortid');
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

exports.saveImage = function(img64, callback) {
  if (img64) {
    var base64Data = img64.replace(/^data:image\/jpg;base64,/, '');
    filename = '/images/' + shortid.generate() + '.jpg';

    fs.writeFile('server' + filename, base64Data, 'base64', function(err) {
      if (err) console.log(err);
      if (callback) callback(filename);
    });

    return filename;
  } else {
    return null;
  }
};

exports.log = function(message, content) {
  console.log('-------------------------------------------------------------------');
  console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  console.log(message);
  console.log(content);
};

exports.rejectPOST = exports.rejectGET = function(req, res, err) {
  res.sendStatus(400);
};

exports.resolveGET = function(req, res, success) {
  res.status(200);
  res.send(success);
};

exports.resolvePOST = function(req, res, success) {
  res.sendStatus(201);
};
