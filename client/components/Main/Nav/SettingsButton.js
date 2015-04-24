
var React = require('react-native');

var Chats = require('../Chats');

var { View, Text, TouchableOpacity} = React;

var SettingsButton = React.createClass({

  render: function(){
    return (
      <View>
        <TouchableOpacity 
          onPress={()=>{this.props.navigator.push({
              component: Chats
          })
        }}>
          <Text>
            Chats
          </Text>
        </TouchableOpacity>
      </View>
      
    );
  },
  
})

module.exports = SettingsButton;
