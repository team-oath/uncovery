
var React = require('react-native');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { TextInput, View, Text, TouchableOpacity, ActivityIndicatorIOS, } = React;

var ChatTextInput = React.createClass({

  getInitialState: function(){
    return {input: '', saved: ''};
  },

  render: function(){
    return (
      <TextInput
        style={{height: 50, padding: 10, fontFamily: 'Avenir', boderRadius: 10}}
        editable={true}
        enablesReturnKeyAutomatically={false}
        autoCorrect={false}
        returnKeyType={'send'}
        placeholder={'Be nice and make a comment...'}
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
    fetch(HOST + 'comment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify({
        x: this.props.coords.latitude,
        y: this.props.coords.longitude,
        z: this.props.coords.altitude,
        messageId: this.props.messageId,
        commentString: this.state.saved,
        userToken: this.props.userToken,
      })
    }).then(()=>{
      this.setState({saved: ''});
      this.props.fetchComments();
    });
  }

});

module.exports = ChatTextInput;
