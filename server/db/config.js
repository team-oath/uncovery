var mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'uncovery'
});

exports.initialize = function(callback) {
  exports.connection.connect(function(err) {
    callback(err);
  });
}
