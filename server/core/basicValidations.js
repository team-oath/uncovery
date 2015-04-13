//basic validations are the building blocks for all other validations

var eachCoord = function(userData, predicate) {
  var coordinatesToValidate = ['x', 'y', 'z'];
  for (var i = 0;i < coordinatesToValidate.length;i++) {
    var coord = coordinatesToValidate[i];
    if (predicate(userData[coord])) {
      return false;
    }
  }
  return true;
};

exports.containsOnlyNumbers = function(userData) {
  var predicate = function(coord) {
    return !!/[^0-9]/.test(Math.floor(coord));
  };
  return eachCoord(userData, predicate);
}

exports.inRange = function (userData) {
  var predicate = function(coord) {
    return coord === '' || +coord > 180 || +coord < 0;
  };
  return eachCoord(userData, predicate);
};

exports.coordinatesExist = function(userData) { 
  var predicate = function(coord) {
    !userData.hasOwnProperty(coord);
  };
  return eachCoord(userData, predicate);
}


