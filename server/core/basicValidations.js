exports.eachCoord = function(userData, predicate) {
  var coordinatesToValidate = ['x', 'y', 'z'];
  for (var i = 0;i < coordinatesToValidate.length;i++) {
    var coord = coordinatesToValidate[i];
    if (predicate(userData, userData[coord])) {
      return false;
    }
  }
  return true;
};

exports.containsOnlyNumbers = function(userData, coord) {
  return !!/[^0-9]/.test(Math.abs(Math.floor(coord)));
};

exports.inRange = function(userData, coord) {
  return coord === '' || +coord > 180 || +coord < -180;
};

exports.coordinatesExist = function(userData, coord) {
  return userData.hasOwnProperty(coord);
};
