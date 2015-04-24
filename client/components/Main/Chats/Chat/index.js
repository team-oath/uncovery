
var React = require('react-native');

var ChatTextInput = require('../TextInput.js');

var { View, Text, StyleSheet, ListView, } = React;

var Chat = React.createClass({

  getInitialState: function(){
    return {
      messages: [{content: 'hello'}, {content: 'yo yo yo'}],
      edit: false,
      sessionId: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentWillMount: function(){
    var messages = this.state.messages;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(messages),
    })
  },

  componentDidMount: function(){

    var socket = this.props.socket;

    var init = {
      userToken: this.props.userToken,
      messageId: this.props.passProps.messageId,
      commentId: this.props.passProps.commentId,
    }

    var initializeChat = function(data){
      var messages = data.messages;
      var sessionId = data.sessionId;
      this.setState({
        sessionId: data.sessionId,
        messages: messages,
        dataSource: this.state.dataSource.cloneWithRows(messages),
      });
    };

    var addMessage = function(message){
      var messages = this.state.messages;
      if ( this.state.sessionId === message.sessionId ){
        messages.push(message);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(messages)
        })
      }
    }

   socket.emit('pmInit', init);

   socket.on('pmInit', initializeChat.bind(this));

   socket.on('pmContent', addMessage.bind(this));

  },

  render: function(){
    return (
      <View>
        {this.props.navBar}
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderMessage.bind(this)}
              style={this.state.edit ? {height: 220} : {height: 450}}
            />
          </View>
          <ChatTextInput 
            editOn={this.editOn.bind(this)} 
            editOff={this.editOff.bind(this)}
            socket={this.props.socket}
            sessionId={this.state.sessionId}
          />
        </View>
      </View>
    )
  },

  renderMessage: function(message){
    return (
      <View>
        <View style={styles.buttonContents}>
          <Text style={styles.messageText}>
            {message.content}
          </Text>
        </View>
        <View style={{height: 1,backgroundColor: 'grey',}}/>
      </View>
    );

  },

  editOn: function(){
    this.setState({edit: true});
  },

  editOff: function(){
    this.setState({edit: false});
  },

});

function isNotUser(message){
  return true;
}

var styles = StyleSheet.create({
  message: {
    marginTop: 50, 
    marginLeft: 50,
  },
  nonUserText: {
    color: 'red',
  },
  messageText: {
    paddingLeft: 12, 
    paddingRight: 12, 
    fontSize: 16,
    fontFamily: 'Avenir',
  },
  buttonContents: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },
  seperator: {
    height: 2,
    backgroundColor: 'black',
    marginTop:20,
  },
});

module.exports = Chat;
