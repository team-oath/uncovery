
var HOST = require('../config.js');

var createRequestURL = (route, props) => {

  if ( route === '/messages' ) {

    var requestURL, params;
    var x = props.currentPosition.coords.latitude;
    var y = props.currentPosition.coords.longitude;
    var z = props.currentPosition.coords.altitude;
    var userToken = props.userToken;

    params = `?x=${x}&y=${y}&z=${z}&userToken=${userToken}`;
    requestURL = `${HOST}${route}${params}`
  }  

  return requestURL;
};

module.exports = createRequestURL;
