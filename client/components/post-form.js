var React = require('react-native');
var styles = require("../styles.js");

var { View, Text, TextInput, TouchableOpacity, } = React;

class PostForm extends React.Component {
  
  constructor(props) {
    
    // Create blank state.input that we reference
    // below, app crashes without this.
    
    this.state = { input: '' };
  }

  render() {

    // Render input box and feedback.

    return (
      <View style={{ top: 64 }}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => this._postMessage()}>
          <Text style={styles.button}>
            Post
          </Text>  
        </TouchableOpacity>
      </View>
    );
  }

  // Post Message to server

  _postMessage() {
    console.log('posted message', this.state.input);

    // this url is for testing purposes 
    // see github.com/levity-io/POST-bin
    // for a POST request catcher

    fetch('http://localhost:3000/4kELPoLe', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: 40.3,
        y: 50.1,
        z: 500,
        message: this.state.input,
      }),
    })
  }
  
};

module.exports = PostForm;
