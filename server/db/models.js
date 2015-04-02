var db = require('./config');

db.initialize();

// The `insert` function is passed an object that contains the properties
// needed to leave a mark: locations `x`, `y`, and `z`, as well as a `message`
exports.insert = function(userData, callback) {

  // Validate that correctly formatted userData that has been passed to `insert`
  if (validateInput(userData)) {

    // Use the provided userData to create custom objects to populate our
    // two separate tables, `marks` and `messages`.
    var message = createMessage(userData);

    // Create an INSERT query to add the `mark` to the database
    db.connection.query('INSERT INTO messages SET ?', message, function(err, msg) {
      if (err) callback(err);

      var mark = createMark(userData, msg.insertId);

      db.connection.query('INSERT INTO marks SET ?', mark, function(err, mark) {
        if (err) callback(err);
        callback('Successfully inserted new message and mark to database.');
      });
    });
  } else {
    callback('Could not insert new message: invalid input.')
  }
};

// validateInput is passed some userData and will return true if that
// object has valid `x`, `y`, `z`, and `message` properties
var validateInput = function(userData) {
  if (!userData.x || !userData.y || !userData.z || !userData.message) {
    return false;
  }
  return true;
}

var createMark = function(userData, messageId) {
  var mark = {
    x: userData.x,
    y: userData.y,
    z: userData.z,
    messageId: messageId
  }
  return mark;
};

var createMessage = function(userData) {
  var message = {
    messageString: userData.message
  }
  return message;
};
