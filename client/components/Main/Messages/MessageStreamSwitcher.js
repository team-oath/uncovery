
var React = require('react-native')

var { View, SwitchIOS, } = React;

var MessageStreamSwitcher = React.createClass({

  getInitialState: function(){
    return {
      switch: true,
    }
  },

  render: function(){
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
  
})

module.exports = MessageStreamSwitcher;
