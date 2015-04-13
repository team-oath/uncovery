//basic validations are the building blocks for all other validations

exports.containsOnlyNumbers = function(userData) {
  var coordinatesToValidate = ['x', 'y', 'z'];
  for (var i = 0;i < coordinatesToValidate.length;i++) {
    var coord = coordinatesToValidate[i];
    if (!!/[^0-9]/.test(Math.floor(userData[coord]))) {
      return false;
    }
  }
  return true;
}

exports.inRange = function (userData) {
  var coordinatesToValidate = ['x', 'y', 'z'];
  for (var i = 0;i < coordinatesToValidate.length;i++) {
    var coord = coordinatesToValidate[i];
    if (userData[coord] === '' || +userData[coord] > 180 || +userData[coord] < 0) {
      return false;
    }
  }
  return true;
}

exports.coordinatesExist = function(userData) { 
  var coordinatesToValidate = ['x', 'y', 'z'];
  for (var i = 0;i < coordinatesToValidate.length;i++) {
    var coord = coordinatesToValidate[i];
    if (!userData.hasOwnProperty(coord)) {
      return false;
    }
  }
  return true;
}
