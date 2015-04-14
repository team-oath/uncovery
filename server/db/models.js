var db = require('./modelAdapters');
var util = require('../core/utilities');
var validate = require('../core/routeValidations.js');

//exports.createMessage({message: 'Excellant, it works!', x: 10, y: 10, z: 10, userToken: 'live'});
exports.createMessage = function(userData) {

  if (!validate.validateCoordinates(userData)) {
    return new Promise(function(resolve, reject) {
      reject('Validations failed. Please enter valid coordinates');
    });
  }

  return db.insert('messages', {
    messageString: userData.message,
    image: util.saveImage(userData.image),
    score: userData.score || 0
    }).then(function(messageSuccess) {
      return db.insert('marks', {
        x: userData.x,
        y: userData.y,
        z: userData.z,
        userToken: userData.userToken,
        messageId: messageSuccess.insertId
    }).then(function(markSuccess) {
      return {markSuccess: markSuccess, messageSuccess: messageSuccess};
    });
  });
};

//exports.createComment({messageId: 1, message: 'works', x: 10, y: 10, z: 10});
exports.createComment = function(userData) {

  if (!validate.validateCoordinates(userData)) {
    return new Promise(function(resolve, reject) {
      reject('Validations failed. Please enter valid coordinates');
    });
  }

  return db.insert('comments',{
    messageId: userData.messageId,
    commentString: userData.commentString
    }).then(function(commentSuccess) {
      return db.insert('marks', {
        x: userData.x,
        y: userData.y,
        z: userData.z,
        userToken: userData.userToken,
        commentId: commentSuccess.insertId
    }).then(function(markSuccess) {
      return {markSuccess: markSuccess, commentSuccess: commentSuccess};
    });
  });
};

//exports.createUser('grgrdg');
exports.createUser = function(token) {
  return db.insert('users', {token: token});
};

//exports.createVote(3, 'grgrdg');
exports.createVote = function(userData) {
  var voteObject = {userToken: userData.userToken};

  if (userData.hasOwnProperty('messageId')) {
    voteObject.messageId = userData.messageId;
  } else {
    voteObject.commentId = userData.commentId;
  }

  return db.insert('votes', voteObject);
};

//exports.retrieveMarks({x: 10, y: 10, z: 10}).then(callback(success));
exports.retrieveMarks = function(userData) {
  if (validate.validateCoordinates(userData)) {
    return db.retrieveMarks(userData);
  } else {
    return new Promise(function(resolve, reject) {
      reject('Validations failed. Please enter valid coordinates');
    });
  }
};

//exports.retrieveScore(3).then(callback(success));
exports.retrieveScore = function(messageId, objectToFill) {
  return new Promise(function(resolve, reject) {
    db.where('messages', ['id', messageId])
      .then(function(success) {
        resolve(success[0].score);
      },
      function(err) {
        reject(err);
      });
  });
};

//exports.updateScore(3, 9001);
exports.updateScore = function(messageId, amount) {
  return db.update('messages', ['score', amount, 'id', messageId]);
};

//exports.retrieveVotes(10).then(function(success){console.log(success)});
exports.retrieveVotes = function(messageId) {
  return db.retrieveCount('votes', ['messageId', messageId]);
};

//exports.retrieveComments(10).then(function(success){console.log(success)});
exports.retrieveComments = db.retrieveComments;
// exports.retrieveComments = function(messageId) {
//   return db.where('comments', ['messageId', messageId]);
// };

//delete(string tableName, [string key, string value]);
exports.deleteRow = db.deleteRow;

//deleteUser(string userToken)
exports.deleteUser = function(userToken) {
  return db.deleteRow('users', ['token', userToken]);
};

//deleteMessage(string messageId)
exports.deleteMessage = function(messageId) {
  return db.deleteRow('messages', ['id', messageId]);
};

//deleteMark(string markId)
exports.deleteMark = function(markId) {
  return db.deleteRow('marks', ['id', markId]);
};

//deleteVote(string voteId)
exports.deleteVote = function(voteId) {
  return db.deleteRow('votes', ['id', voteId]);
};

//deleteMarkByUserToken(string userToken);
exports.deleteMarkByUserToken = function(userToken) {
  return db.deleteRow('marks', ['userToken', userToken]);
};

//deleteMessagesByScore(string score);
exports.deleteMessagesByScore = function(score) {
  return db.deleteRow('messages', ['score', score]);
};
