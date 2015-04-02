var React = require('react-native');
var styles = require("../styles.js");

var { View, Text, TextInput } = React;

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
        <Text>{'user input: ' + this.state.input}</Text>
      </View>
    );
  }
  
};

module.exports = PostForm;
