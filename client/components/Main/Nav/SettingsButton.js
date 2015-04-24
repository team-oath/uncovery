
var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var BackButton = require('./BackButton.js')


var Chats = require('../Chats');

var { View, Text, Image, TouchableOpacity} = React;

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
          <Image
            source={{uri: 'http://i.imgur.com/c5lrpvw.png'}}
            style={{height: 23, width: 29, marginBottom: 8, marginLeft: 15,}}
          />
         
        </TouchableOpacity>
      </View>
      
    );
  },
  
})

module.exports = SettingsButton;
