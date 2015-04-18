
var React = require('react-native')

var { TouchableOpacity, Text, View, } = React;

var MessageTextInputButton = React.createClass({

  getInitialState: function(){
    return {toggle: false}
  },

  render: function(){
    return (
      <TouchableOpacity 
        onPress={this._toggle.bind(this)}>
        <Text style={{
          color: 'white', 
          fontSize: 25, 
          marginRight: 20, 
          marginBottom: 1, 
          fontFamily: 'Avenir'}}>
        {this.state.toggle ? 'x' : '+' }  
        </Text>
      </TouchableOpacity>
    );
  },

  _toggle: function(){
    this.props.show();
    this.setState({toggle:this.state.toggle ? false : true});
  }

});

module.exports = MessageTextInputButton;
