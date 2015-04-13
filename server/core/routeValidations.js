var validate = require('./basicValidations.js');

exports.validateCoordinates = function(userData) {
  var predicates = [
    validate.coordinatesExist,
  validate.containsOnlyNumbers,
  validate.inRange
  ];

  for (var i = 0;i < predicates.length;i++) {
    if (!validate.eachCoord(userData, predicates[i])) {
      return false;
    }
  }
  return true;
};
