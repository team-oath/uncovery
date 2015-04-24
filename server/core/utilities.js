var moment = require('moment');
var geolib = require('geolib');
var shortid = require('shortid');
var aws = require('aws-sdk');
var fs = require('fs');
var themes = require('./themes');
var awsConfig = require('./awsConfig');

// Use moment.js to calculate how much time has elapsed since some prior time
exports.getTimeElapsedSince = function(time) {
  return moment(time).fromNow();
};

// Use geolib.js to calculate distance from the mark to the user
exports.getDistanceFrom = function(mark, user) {
  var dist = geolib.getDistance(
      {latitude: user.x, longitude: user.y},
      {latitude: mark.x, longitude: mark.y},
      {unit: 'mi'}
      );
  dist = addTextToDistance(dist);
  return dist;
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

exports.decorateCommentsWithVoteStatus = function(comments, votes) {
  var voted = {};
  for (var k = 0;k < votes.length;k++) {
    voted[votes[k].commentId] = true;
  }
  for (var i = 0;i < comments.length;i++) {
    var commentId = comments[i].commentId;
    if (voted[commentId]) {
      comments[i].voted = true;
    } else {
      comments[i].voted = false;
    }
  }
  return comments;
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
      imageH: mark.imageH,
      imageW: mark.imageW,
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
        name: createIdentity(mark.userToken, user.messageId),
        votes: mark['COUNT(votes.id)']
      };
      responseObjects.push(responseObject);
    }
  });

  return responseObjects;
};

var hashCode = function(string) {
  var hash = 0;
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return hash;
};

var createIdentity = exports.createIdentity = function(userToken, messageId, type) {
  type = type || 0;
  var identities = themes[type];
  var i = Math.abs(hashCode(userToken + messageId)) % (identities.length-1);
  return identities[i];
};

exports.saveImage = function(img64, callback, testing) {
  if (img64) {
    var base64Data = img64.replace(/^data:image\/jpg;base64,/, '');
    var imgName = shortid.generate();
    var filename = 'server/images/' + imgName + '.jpg';

    fs.writeFile(filename, base64Data, 'base64', function(err) {
      if (err) console.log(err);
      if (testing) {
        if (callback) callback(imgName);
      } else {
        awsConfig.s3uploader(filename, imgName + '.jpg').then(function(data) {
          if (callback) callback(imgName, data.Location.replace(/"/g, '&quot;'));
        });
      }
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

exports.createId = function() {
  return shortid.generate();
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

function addTextToDistance(dist) {
  if ((dist) < 0.25) {
    dist = 0.25;
  } else if (dist < 0.5) {
    dist = 0.5
  } else {
    dist = Math.ceil(dist);
  }
  if (dist === 1) {
    dist = dist + ' mile away';
  } else {
    dist = dist + ' miles away';
  }
  return dist;
}


