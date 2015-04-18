
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
          onTintColor='#c05b2c'
          thumbTintColor='#C0362C'
          TintColor='#edb4b0'
          />
      </View>
    );
  }
  
})

module.exports = MessageStreamSwitcher;
