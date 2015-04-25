
var React = require('react-native')

var { View, SwitchIOS, } = React;

class MessageStreamSwitcher extends React.Component {

  constructor(){
    this.state = {
      switch: true,
    }
  }

  render(){
    return (
      <View>
        <SwitchIOS
          onValueChange={(value) => this.setState({switch: value})} 
          value={this.state.switch} 
          onTintColor='#e28680'
          thumbTintColor='#c05b2c'
          TintColor='#c05b2c'
          />
      </View>
    );
  }
  
};

module.exports = MessageStreamSwitcher;
