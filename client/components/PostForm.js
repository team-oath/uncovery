
var React = require('react-native');
var styles = require("../styles.js");
var config = require('../config.js');

var { View, Text, TextInput, TouchableOpacity, } = React;

class PostForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      input: '', 
      buttonText: 'Mark',
    };
  }

  render() {
    console.log('############', this.props.route.userToken)
    return (
      <View style={{ top: 100, padding:20, justifyContent: 'center',}}>
        <TextInput
          editable={true}
          enablesReturnKeyAutomatically={true}
          placeholder={'Your mark...'}
          style={styles.textInput}
          onChangeText={(text) => this.setState({input: text})}
        />
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            this._popBackToMarks(); 
            this._postMessage();
          }
        }>
          <Text style={styles.button}>
            {this.state.buttonText}
          </Text>  
        </TouchableOpacity>
      </View>
    );
  }

  _popBackToMarks() {
    this.props.navigator.pop();
  }

  _postMessage() {
    var postMessage = (currentPosition) => {
      fetch(config.host, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          x: currentPosition.coords.latitude,
          y: currentPosition.coords.longitude,
          z: currentPosition.coords.altitude,
          message: this.state.input,
          userToken: this.props.route.userToken,
        })
      })
    }
    navigator.geolocation.getCurrentPosition(postMessage);
  }
};

module.exports = PostForm;
