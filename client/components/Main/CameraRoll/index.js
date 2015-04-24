
var React = require('react-native');

/* ------ Components ------- */

var CameraRollView = require('./CameraRollView.ios.js');

/* ------ Configs ------- */

var styles = require('../../../styles.js'); 

/* ------ Destructuring Block ------- */

var { 
	TouchableOpacity,
	View,
	Image,
} = React;

/* ------ Main Component ------- */

var CameraRoll = React.createClass({

  render: function() {
    return (
      <View style={{ width: require('Dimensions').get('window').width }}>
        <CameraRollView
          ref='cameraRollView'
          batchSize={4}
          groupTypes='SavedPhotos'
          renderImage={this._renderImage}
        />
      </View>
    );
  },

  _renderImage: function(asset) {
    return (
      <TouchableOpacity onPress={()=>{this._handleSelection(asset)}}>
          <Image
            source={asset.node.image}
            style={[styles.image, styles.imagePreview]}
          />
      </TouchableOpacity>
    );
  }, 

  _handleSelection: function(asset){
    this.props.route.selectImage(asset);
    this.props.navigator.pop();
  }

});

module.exports = CameraRoll;
