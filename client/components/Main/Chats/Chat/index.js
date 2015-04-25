
var React = require('react-native');

var ChatTextInput = require('../TextInput');

var styles = require('./styles.js');

var { View, Text, ListView, } = React;

class Chat extends React.Component {

  constructor(){
    this.state = {
      messages: [],
      edit: false,
      sessionId: null,
      creator: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount(){

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

  }

  render(){
    return (
      <View>
        {this.props.navBar}
        <View style={styles.viewContainer}>
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
  }

  renderMessage(message){

    var isFromUser = 
      (this.state.creator && message.from === 'you') ||
      (!this.state.creator && message.from === 'them')

    var chatContent = isFromUser ? 
      [styles.chatContent, {justifyContent: 'flex-end'}] : 
      styles.chatContent

    var messageText = isFromUser ? 
      styles.userText : 
      styles.recepientText

    return (
      <View style={chatContent}>
        <Text style={messageText}>
          {message.content}
        </Text>
      </View>
    );

  }

  editOn(){
    this.setState({edit: true});
  }

  editOff(){
    this.setState({edit: false});
  }

};

module.exports = Chat;
