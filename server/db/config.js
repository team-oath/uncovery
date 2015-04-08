var mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'tony',
  database: 'uncovery'
});

exports.initialize = function(callback) {
  exports.connection.connect();
};
