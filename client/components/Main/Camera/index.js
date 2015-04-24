
var React = require('react-native');

/* ------ Components ------- */

var Camera = require('react-native-camera');

/* ------ Configs ------- */

var styles = require('../../../styles.js'); 

/* ------ Destructuring Block ------- */

var { 

	TouchableOpacity, 
	View, 
	StatusBarIOS, 
	Image 
  
} = React;

/* ------ Main Component ------- */

var CameraView = React.createClass({

  render: function() {
    var dimensions = require('Dimensions').get('window');

    this._hideStatusBar();

    return (
      <View>
        <View>
          <Camera
            ref="cam"
            aspect="Fill"
            type="Back"
            orientation="Portrait"
            style={{height: dimensions.height, width: dimensions.width}}
          >
            <TouchableOpacity onPress={this._switchCamera}>
              <Image style={styles.swapCamera} source={{ uri: 'http://i.imgur.com/1Mo4sCM.png' }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._takePicture}>
              <Image style={[styles.takePhoto, { top: dimensions.height-150 }]} source={{ uri: 'http://i.imgur.com/OSFbd2l.png' }} />
            </TouchableOpacity>
          </Camera>
        </View>
      </View>
    );
  },

  _hideStatusBar: function(){
    {Object.keys(StatusBarIOS.Animation).map((key) =>
      StatusBarIOS.setHidden(true, StatusBarIOS.Animation[key])
    )}
  },

  _showStatusBar: function(){
    {Object.keys(StatusBarIOS.Animation).map((key) =>
      StatusBarIOS.setHidden(false, StatusBarIOS.Animation[key])
    )}
  },

  _switchCamera: function() {
    this.refs.cam.switch();
  },

  _takePicture: function(){
    var self = this;
    this.refs.cam.takePicture(function(err, data){
      self._showStatusBar();
      self.props.route.takePhoto(data);
      self.props.navigator.pop();
    });
  }

});

module.exports = CameraView;
