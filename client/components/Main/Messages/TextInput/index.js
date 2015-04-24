
var React = require('react-native');
var Reactive = require('../../../../react-events.js');
var ActionSheetIOS = require('ActionSheetIOS');

var CameraRollButton = require('../../Nav/CameraRollButton.js');
var CameraRoll = require('../CameraRoll.js');
var Camera = require('../Camera.js');
var imageButtons = ['From Camera','Photo Library','Cancel'];

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js'); 

var { 

  View, 
  Text,
  TextInput, 
  Navigator,
  AlertIOS,
  NativeModules,

} = React;

var MessageTextInput = React.createClass({

  getInitialState: function(){
    return {
      input:'',
      saved:'',
      selectedImage: '',
      imageData: null,
      userHasSelectAnImage: false,
    };
  },

  render: function(){

    return (
      <View style={{backgroundColor: 'white',}}>
        <View style={{
          flexDirection:'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginRight: 10, 
          marginTop: 10,
          backgroundColor: 'white',
        }}>
          <TextInput
            style={{height: 50, padding: 10, flex: 1, backgroundColor: 'white', fontFamily: 'Avenir', fontSize: 20}}
            editable={true}
            enablesReturnKeyAutomatically={false}
            autoCorrect={false}
            returnKeyType={'send'}
            placeholder={'Be nice and make a comment...'}
            value={this.state.input}
            onSubmitEditing={this._handleSubmit.bind(this)}
            clearButtonMode='while-editing'
            onChangeText={(text) => this.setState({input: text})}
          />
          <View style={{
            flexDirection:'row', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between', 
            marginBottom: 10}}
          >
            <CameraRollButton
              navToCameraRoll={this._showImageOptions.bind(this)}
              userHasSelectAnImage={this.state.userHasSelectAnImage}
            />
          </View>
        </View>
      <View style={styles.seperator} />
      </View> 
    )
  },

  _handleSubmit: function(){
    if (!this.state.userHasSelectAnImage) {
      this._submit();
    } else {
      this._postMessageWithImage();
    }
  },

  _submit: function(image, imageWidth, imageHeight){
    
    var watchError = (error) => {
      console.error(error);
      AlertIOS.alert(
        'Geolocation Error',
        'Please Turn on iOS Location Services'
      )
    }

    navigator.geolocation.getCurrentPosition((currentPosition)=>{

      var data = {
         x: currentPosition.coords.latitude,
         y: currentPosition.coords.longitude,
         z: currentPosition.coords.altitude,
         message: this.state.input,
         userToken: this.props.userToken,
       }

      if ( this.state.userHasSelectAnImage ) {
        data.image = image;
        data.imageW = imageWidth;
        data.imageH = imageHeight;
      }

      fetch(HOST + 'messages', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'},
         body: JSON.stringify(data),
      }).then(this._toggleState.bind(this))
        .done();

   }, watchError);

  },

  _pushForwardToCameraRoll: function(){
    var selectImage = this._selectImage.bind(this);
    this.props.navigator.push({ 
      component: CameraRoll,
      navigator: this.props.navigator,
      selectImage: this._selectImage.bind(this), 
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  },


  _postMessageWithImage: function(){
    var self = this;
    var dimensions = require('Dimensions').get('window');
    
    if (this.state.cameraPhoto){
      this._submit(this.state.imageData, dimensions.width*1.4, dimensions.height*1.6);
    } else {
      NativeModules.ReadImageData.processString(
        self.state.selectedImage.node.image.uri, 
        (image, imageWidth, imageHeight) => {
          self._submit(image, imageWidth, imageHeight);
      });
    }
  },

  _selectImage: function(image){
    this.setState({ 
      cameraPhoto: false, 
      selectedImage: image,
      userHasSelectAnImage: true 
    });
  },

  _pushForwardToCamera: function() {
    this.props.navigator.push({ 
      component: Camera,
      navigator: this.props.navigator,
      takePhoto: this._takePhoto.bind(this), 
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  },

  _showImageOptions: function() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: imageButtons,
      cancelButtonIndex: imageButtons.length-1
    },
    (buttonIndex) => {
      if ( buttonIndex === 0 ) { //Camera
        this._pushForwardToCamera();
      } else if ( buttonIndex === 1 ) { //Library
        this._pushForwardToCameraRoll();
      }
    });
  },

  _takePhoto: function(data){
    // The photo is returned as base64 data.
    // We don't need to encode again on submission.
    this.setState({
      cameraPhoto: true,
      imageData: data,
      userHasSelectAnImage: true, 
    });
  },

  _toggleState: function(){
    // console.log('**************', Reactive)
    // Reactive.trigger('submit');

    this.setState({
      input:'', 
      selectedImage: null, 
      userHasSelectAnImage: false,
    });

    this.props.toggleEdit();
    this.props.fetchMessages();

    setTimeout((()=>{
       this.props.fetchMessages()
    }).bind(this), 300);
  }

});

module.exports = MessageTextInput;
