
var React = require('react-native');
var PostMessage = require('../Main/Messages/PostMessage.js')

var { View, Text, StyleSheet, } = React;
var window = require('Dimensions').get('window');

console.log(window.height, window.width)

var Menu = React.createClass({
  about: function() {
     this.props.menuActions.close();
     this.props.navigator.push({
      component: PostMessage,
     });
   },

  render: function() {
    return (
      <View style={{backgroundColor: '#FDB515', height: window.height, width: window.width}}>
        <View style={{marginTop: 100, paddingLeft: 50,}}>
          <Text></Text>
          <Text></Text>
          <Text style={{color: 'white', fontSize: 35}}>
            Profile 
          </Text>
          <Text></Text>
          <Text></Text>
          <Text style={{color: 'white', fontSize: 35}}>
            Chat
          </Text>
          <Text></Text>
          <Text></Text>
          <Text style={{color: 'white', fontSize: 35}}>
            Settings
          </Text>
          <Text></Text>
          <Text></Text>
          <Text style={{color: 'white', fontSize: 35}} onPress={this.about}> 
            About 
          </Text> 
        </View>
      </View>
    );
  }
});

module.exports = Menu;
