
var React = require('react-native')

var { View, Text, } = React;

var NumHeartsDisplay = React.createClass({

  render(){
    return (
      <View>
        <Text style={{
          color:'white', 
          fontSize: 20, 
          marginLeft: 15, 
          marginBottom: 5, 
          fontFamily: 'Avenir'
        }}>
          15
        </Text>
      </View>
    );
  }
  
})

module.exports = NumHeartsDisplay;
