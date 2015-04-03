var db = require('./config');

db.initialize();

/////////////////////////          INSERTION          //////////////////////////////

// The `insert` function is passed an object that contains the properties
// needed to leave a mark: locations `x`, `y`, and `z`, as well as a `message`
exports.insert = function(userData, callback) {

  // Validate that correctly formatted userData that has been passed to `insert`
  if (validateInput(userData)) {

    // Use the provided userData to create the custom `message` to insert
    var message = createMessage(userData);

    // Create an INSERT query to add the `message` to the database
    db.connection.query('INSERT INTO messages SET ?', message, function(err, msg) {
      if (err) callback(err);

      // Use the provided userData to create the custom `mark` to insert
      var mark = createMark(userData, msg.insertId);

      // Create an INSERT query to add the `mark` to the database
      db.connection.query('INSERT INTO marks SET ?', mark, function(err, mark) {
        if (err) callback(err);

        // Let the function callee know that the insertion was successful
        callback('Successfully inserted new message and mark to database.');
      });
    });
  } else {
    // Let the function callee know that the insertion was unsuccessful
    callback('Could not insert new message: invalid input.');
  }
};

// validateInput is passed some userData and will return true if that
// object has valid `x`, `y`, `z`, and `message` properties
var validateInput = function(userData) {
  if (!userData.x || !userData.y || !userData.z || !userData.message) {
    return false;
  }
  return true;
};

// Create a mark to add to the database. This function essentially
// parses the userData to extract only the coordinates and message foreign key
var createMark = function(userData, messageId) {
  var mark = {
    x: userData.x,
    y: userData.y,
    z: userData.z,
    messageId: messageId
  };
  return mark;
};

// Create a message to add to the database. For now, this only includes strings
// In the future, this function will be able to accept many content types
var createMessage = function(userData) {
  var message = {
    messageString: userData.message
  };
  return message;
};

/////////////////////////          RETRIEVAL          //////////////////////////////

// The `insert` function is passed an object that contains the properties
// needed to perform a search: locations `x`, `y`, and `z`
exports.retrieve = function(userLocation, callback) {
  // We need to search in a .0001 lat/long radius
  var query = ([
    'SELECT * FROM marks',
    'WHERE x between ? AND ?',
    'AND y between ? AND ?'
  ]).join(' ');

  var params = [
    userLocation.x - .0001,
    userLocation.x + .0001,
    userLocation.y - .0001,
    userLocation.y + .0001,
  ];

  db.connection.query(query, params, function(err, marks) {
    if (err) callback(err);
    callback(marks);
  })
};
