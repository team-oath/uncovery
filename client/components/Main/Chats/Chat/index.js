
var React = require('react-native');
var io = require('../../Nav/socket.io-client.js');

var ChatTextInput = require('../TextInput.js');

var { View, Text, StyleSheet, ListView} = React;

var Chat = React.createClass({

  getInitialState: function(){
    return {
      messages: [{content: 'hello'}, {content: 'yo yo yo'}],
      io: io('http://oath-test.cloudapp.net/', {jsonp: false}),
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

    var init = {
      userToken: this.props.userToken,
      messageId: this.props.passProps.messageId,
      commentId: this.props.passProps.commentId,
    }

    var pmInit = function(){
      this.state.io.emit('init', {userToken: this.props.userToken})
      this.state.io.emit('pmInit', init);
    }

    var saveSessionId = function(data){
      this.setState({sessionId: data.sessionId});
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

    this.state.io.on('connect', pmInit.bind(this));

    this.state.io.on('pmInit', saveSessionId.bind(this));

    this.state.io.on('pmContent', addMessage.bind(this));

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
            io={this.state.io}
            sessionId={this.state.sessionId}
          />
        </View>
      </View>
    )
  },

  renderMessage: function(message){
    return (
      <View style={styles.buttonContents}>
        <View>
          <Text style={styles.messageText}>
            {message.content}
          </Text>
        </View>
        <View style={{height: 2,backgroundColor: 'black', marginTop:50,}}/>
      
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
  },
  seperator: {
    height: 2,
    backgroundColor: 'black',
    marginTop:20,
  },
});



module.exports = Chat;
