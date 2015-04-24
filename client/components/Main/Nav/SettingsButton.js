
var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var BackButton = require('./BackButton.js')


var Chats = require('../Chats');

var { View, Text, TouchableOpacity} = React;

var SettingsButton = React.createClass({

  render: function(){
    return (
      <View>
        <TouchableOpacity 
          onPress={()=>{this.props.navigator.push({
              component: Chats,
              navigationBar: 
                <NavigationBar 
                  backgroundColor='#C0362C'
                  title='Chats'
                  titleColor='white'
                  customPrev={<BackButton/>}
                />
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
