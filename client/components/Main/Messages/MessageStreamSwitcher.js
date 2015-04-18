
var React = require('react-native')

var { View, SwitchIOS, } = React;

var MessageStreamSwitcher = React.createClass({

  render(){
    return (
      <View>
        <SwitchIOS value={true} />
      </View>
    );
  }
  
})

module.exports = MessageStreamSwitcher;
