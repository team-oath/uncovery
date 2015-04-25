
var React = require('react-native');

var ChatTextInput = require('../TextInput');

var styles = require('./styles.js');

var { View, Text, ListView, } = React;

var Chat = React.createClass({

  getInitialState: function(){
    return {
      messages: [],
      edit: false,
      sessionId: null,
      creator: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function(){

    var messages = this.state.messages;
    var socket = this.props.socket;

    var init = {
      userToken: this.props.userToken,
      messageId: this.props.passProps.messageId,
      commentId: this.props.passProps.commentId,
    }

    var initializeChat = function(data){
      var messages = data.messages;
      var sessionId = data.sessionId;
      var creator = data.creator;

      console.log(creator)
      this.setState({
        sessionId: data.sessionId,
        messages: messages,
        dataSource: this.state.dataSource.cloneWithRows(messages),
        creator: creator,
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

  this.setState({
    dataSource: this.state.dataSource.cloneWithRows(messages),
  })

  socket.emit('pmInit', init);
  socket.on('pmInit', initializeChat.bind(this));
  socket.on('pmContent', addMessage.bind(this));

  },

  render: function(){
    return (
      <View>
        {this.props.navBar}
        <View style={styles.viewContainer}>
          <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderMessage}
              style={this.state.edit ? {height: 220} : {height: 450}}
            />
          </View>
          <ChatTextInput 
            editOn={this.editOn} 
            editOff={this.editOff}
            socket={this.props.socket}
            sessionId={this.state.sessionId}
          />
        </View>
      </View>
    )
  },

  renderMessage: function(message){

    var isFromUser = 
      (this.state.creator && message.from === 'you') ||
      (!this.state.creator && message.from === 'them')

    var chatContent = isFromUser ? 
      [styles.chatContent, {justifyContent: 'flex-end'}] : 
      styles.chatContent

    var messageText = isFromUser ? 
      styles.userText : 
      styles.recepientText

    // console.log(isFromUser)
    // console.log(chatContent)
    // console.log(messageText)

    return (
      <View style={chatContent}>
        <Text style={messageText}>
          {message.content}
        </Text>
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

module.exports = Chat;
