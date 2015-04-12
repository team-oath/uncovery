
var React = require('react-native');
var PostMessage = require('../Main/Messages/PostMessage.js')

var { View, Text, StyleSheet, } = React;

var Menu = React.createClass({
  about: function() {
     this.props.menuActions.close();
     this.props.navigator.push({
      component: PostMessage,
     });
   },

  render: function() {
    return (
      <View style={{marginTop: 100, paddingLeft: 50}}>
        <Text>Menu</Text>
        <Text onPress={this.about}>About</Text> 
      </View>
    );
  }
});

module.exports = Menu;