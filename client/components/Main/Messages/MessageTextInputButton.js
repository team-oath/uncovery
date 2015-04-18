
var React = require('react-native')

var { TouchableOpacity, Text, View, } = React;

var MessageTextInputButton = React.createClass({

  render(){
    return (
      <TouchableOpacity onPress={this.props.show}>
        <Text>
          +
        </Text>
      </TouchableOpacity>
    );
  }

});

module.exports = MessageTextInputButton;
