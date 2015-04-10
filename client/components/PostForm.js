
var POST_FORM = {};

var React = require('react-native');
var styles = require("../styles.js");
var config = require('../config.js');

var { 
  
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  TouchableHighlight, 
  CameraRoll, 
  Image, 
  NativeModules, 

} = React;

var CameraRollView = require('./CameraRollView.ios');

class CameraRollExample extends React.Component {

  render() {
    return (
      <View style={styles.row}>
        <CameraRollView
          ref='cameraRollView'
          batchSize={4}
          groupTypes='SavedPhotos'
          renderImage={this._renderImage}
        />
      </View>
    );
  }

  _renderImage(asset) {
    return (
      <TouchableHighlight
        onPress={() => {
          POST_FORM.selectedImage = asset;
          POST_FORM.navigator.pop();
        }}>
          <Image
            source={asset.node.image}
            style={styles.image}
          />
      </TouchableHighlight>
    );
  }

}

class PostForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      input: '', 
      buttonText: 'Mark',
    };

    POST_FORM.navigator = this.props.navigator;
  }

  render() {

    // Two different layouts
    // One with a preview image, one without.
    var preview;
    if (!POST_FORM.selectedImage){
      var viewStyle = styles.previewView;
      preview = <Text style={styles.addImageButton}>Share a photo!</Text>
    }else{
      var viewStyle = styles.previewViewWithImage;
      preview = <View style={styles.row}><Image source={POST_FORM.selectedImage.node.image} style={styles.previewImage} /></View>
    }

    return (
      <View style={viewStyle}>
        <TouchableOpacity
          onPress={() => {this._pushForwardToCameraRoll()}}>
          {preview}
        </TouchableOpacity>
        <TextInput
          editable={true}
          enablesReturnKeyAutomatically={true}
          autoCorrect={false}
          returnKeyType={'send'}
          placeholder={'Be nice and share...'}
          style={styles.textInput}
          onChangeText={(text) => this.setState({input: text})}
          onSubmitEditing={() => {
            this._popBackToMarks();
            if ( !POST_FORM.selectedImage ) {
              this._postMessage(this.state.input);
            } else {
              this._postMessageWithImage(this.state.input);
            } 
          }
        }
        />
      </View>
    );
  }

  _popBackToMarks() {
    this.props.navigator.pop();
  }

  _pushForwardToCameraRoll() {
    this.props.navigator.push({ component: CameraRollExample });
  }

  _postMessageWithImage(input){
    var self = this;
    NativeModules.ReadImageData.processString(POST_FORM.selectedImage.node.image.uri, (image) => {
      this._postMessage(input, image);
    });
  }

  _postMessage(input, image) {

    navigator.geolocation.getCurrentPosition((currentPosition)=>{

      var data = {
        x: currentPosition.coords.latitude,
        y: currentPosition.coords.longitude,
        z: currentPosition.coords.altitude,
        message: input,
        userToken: this.props.route.userToken,
      }
     
      if (image){
        data.image = image;
      }

      delete POST_FORM.selectedImage;

      fetch(config.host, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

    });
  }

};

module.exports = PostForm;
