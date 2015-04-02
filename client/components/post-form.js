var React = require('react-native');
var styles = require("../styles.js");

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  ListView,
  SwitchIOS,
  Text,
  TextInput
} = React;

var PostForm = React.createClass({
  
  getInitialState() {
    return {};
  },
  
  render() {
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
  
});

module.exports = PostForm;
