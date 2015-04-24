
var React = require('react-native');

var styles = require('../../../styles.js');
var HOST = require('../../../config.js');

var { TextInput, View, Text, TouchableOpacity, ActivityIndicatorIOS, } = React;

var ChatTextInput = React.createClass({

  getInitialState: function(){
    return {
      input: '', 
      saved: ''
    };
  },

  render: function(){
    return (
      <TextInput
        style={{height: 50, padding: 10, fontFamily: 'Avenir', boderRadius: 10}}
        editable={true}
        enablesReturnKeyAutomatically={false}
        autoCorrect={false}
        returnKeyType={'send'}
        placeholder={'Have fun, make a connection...'}
        value={this.state.input}
        onEndEditing={this.props.editOff}
        onSubmitEditing={this._submit}
        clearButtonMode='while-editing'
        onFocus={this.props.editOn}
        onChangeText={(text) => {
          this.setState({input: text, saved: text})
        }}
      />
      );
  },

  _submit: function(){
    this.props.editOff()
    this.setState({input: ''});
    this._postChatMessage();
  },

  _postChatMessage: function(){
    this.props.socket.emit('pmContent', {
      sessionId: this.props.sessionId, 
      content: this.state.saved
    });

    this.setState({saved: ''});
  }

});

module.exports = ChatTextInput;
