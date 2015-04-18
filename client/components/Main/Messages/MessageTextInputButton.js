
var React = require('react-native')

var { TouchableOpacity, Text, View, } = React;

var MessageTextInputButton = React.createClass({

  render(){
    return (
      <TouchableOpacity onPress={this.props.show}>
        <Text style={{
          color: 'white', 
          fontSize: 25, 
          marginRight: 20, 
          marginBottom: 1, 
          fontFamily: 'Avenir'
        }}>
          +
        </Text>
      </TouchableOpacity>
    );
  }

});

module.exports = MessageTextInputButton;
