var React = require('react-native');
var styles = require("../styles.js");

var { View, Text, TextInput, TouchableOpacity, } = React;

class PostForm extends React.Component {
  
  constructor(props) {
    
    // Create blank state.input that we reference
    // below, app crashes without this.
    
    this.state = { 
      input: '', 
      buttonText: 'Mark',
      lastPosition: {
        coords: {
          longitude : 0, 
          latitude : 0, 
          altitude : 0,
          accuracy: 0,
        }
      } 
    };
  }

  componentDidMount() {

   var watchOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000, 
    timeout: 27000
   };

   var watchSucess = (lastPosition) => {
     this.setState({lastPosition});
   }

   var watchError = (error) => console.error(error);

   navigator.geolocation.getCurrentPosition(
     (initialPosition) => this.setState({initialPosition}),
     (error) => console.error(error)
   );

   this.watchID = navigator.geolocation.watchPosition(
    watchSucess, watchError, watchOptions
   );

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {

    // Render input box and feedback.

    return (
      <View style={{ top: 100, padding:20, justifyContent: 'center', }}>

        <TextInput
          editable={true}
          enablesReturnKeyAutomatically={true}
          placeholder={'Your mark...'}
          style={styles.textInput}
          onChangeText={(text) => this.setState({input: text})}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => this._postMessage()}>
          <Text style={styles.button}>
            {this.state.buttonText}
          </Text>  
        </TouchableOpacity>
      </View>
    );
  }

  // Post Message to server

  _postMessage() {
    
    var navBar = this.props.navigator;
    var currentPosition = this.state.lastPosition.coords;
    // this url is for testing purposes 
    // see github.com/levity-io/POST-bin
    // for a POST request catcher

    fetch('http://uncovery.ngrok.com/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: currentPosition.latitude,
        y: currentPosition.longitude,
        z: currentPosition.altitude,
        message: this.state.input,
      })
    }).then((responseText) => {
      // Bounce back to main window
      navBar.pop();
    })
  }
  
};

module.exports = PostForm;