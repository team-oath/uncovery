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

exports.decorateMarksWithVoteStatus = function(marks, votes) {
  var voted = {};
  for (var k = 0;k < votes.length;k++) {
    voted[votes[k].messageId] = true;
  }
  for (var i = 0;i < marks.length;i++) {
    var markMessageId = marks[i].messageId;
    if (voted[markMessageId]) {
      marks[i].voted = true;
    } else {
      marks[i].voted = false;
    }
  }
  return marks;
};

// The object we pull from the database has specific data (time/location)
// Here we create a new object that has data that is relevant to the user
exports.createMessageResponseObjects = function(marks, user) {
  var responseObjects = [];
  var responseObject;

  marks.forEach(function(mark) {
    responseObject = {
      timestamp: exports.getTimeElapsedSince(mark.timestamp),
      distance: exports.getDistanceFrom(mark, user),
      messageId: mark.messageId,
      messageString: mark.messageString,
      image: mark.image,
      score: mark.score,
      votes: mark['COUNT(distinct votes.id)'],
      comments: mark['COUNT(distinct comments.id)']
    };
    responseObjects.push(responseObject);
  });
  return responseObjects;
};

exports.createCommentResponseObjects = function(marks, user) {
  var responseObjects = [];
  var responseObject;

  marks.forEach(function(mark) {
    if (mark.id !== null) {
      responseObject = {
        timestamp: exports.getTimeElapsedSince(mark.timestamp),
        distance: exports.getDistanceFrom(mark, user),
        commentId: mark.commentId,
        commentString: mark.commentString,
        votes: mark['COUNT(votes.id)']
      };
      responseObjects.push(responseObject);
    }
  });

  return responseObjects;
};

exports.saveImage = function(img64, callback) {
  if (img64) {
    var base64Data = img64.replace(/^data:image\/jpg;base64,/, '');
    var imgName = shortid.generate();
    var filename = 'server/images/' + imgName + '.jpg';

    fs.writeFile(filename, base64Data, 'base64', function(err) {
      if (err) console.log(err);
      if (callback) callback(imgName);
    });

    return imgName;
  } else {
    return null;
  }
};

exports.getImage = function(imgName) {
  return new Promise(function(resolve, reject) {
    var filename = 'server/images/' + imgName + '.jpg';
    fs.readFile(filename, function(err, img) {
      if (err) {
        reject(err);
      } else {
        resolve(img);
      }
    });
  });
};

exports.getLogStream = function() {
  console.log(__dirname);
  var accessLogStream = fs.createWriteStream(__dirname + '/../log/access.log', {flags: 'a'});
  return {stream: accessLogStream};
};

exports.createQueryParams = function(obj) {
  var params = [];

  for (var k in obj) {
    params.push(k);
    params.push(obj[k]);
  }

  return params;
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
