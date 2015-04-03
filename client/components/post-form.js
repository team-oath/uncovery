var React = require('react-native');
var styles = require("../styles.js");

var { View, Text, TextInput, TouchableOpacity, } = React;

class PostForm extends React.Component {
  
  constructor(props) {
    
    // Create blank state.input that we reference
    // below, app crashes without this.
    
    this.state = { 
      input: '', 
      lastPosition: {
        coords: {
          longitude : 0, 
          latitude : 0, 
          altitude : 0
        }
      } 
    };
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => console.error(error)
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {

    // Render input box and feedback.

    return (
      <View style={{ top: 100 }}>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({input: text})}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => this._postMessage()}>
          <Text style={styles.button}>
            Post
          </Text>  
        </TouchableOpacity>
        <Text>
        longitude is {JSON.stringify(this.state.lastPosition.coords.longitude)}
        </Text>
        <Text>
        latitude is {JSON.stringify(this.state.lastPosition.coords.latitude)}
        </Text>
        <Text>
        altitude is {JSON.stringify(this.state.lastPosition.coords.altitude)}
        </Text>
      </View>
    );
  }

  // Post Message to server

  _postMessage() {

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
      }),
    })
  }
  
};

module.exports = PostForm;
