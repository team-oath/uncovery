
var React = require('react-native');
var io = require('../../Nav/socket.io-client.js');

var ChatTextInput = require('../TextInput.js')

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
      console.log('ADD MESsage')
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


    setInterval((()=>{
      this.state.io.emit('pmContent', {sessionId: this.state.sessionId, content: 'hey hey hey hey'})
    }).bind(this), 1000)

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
          />
        </View>
      </View>
    )
  },

  renderMessage: function(message){
    return (
      <View>
        <Text>
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
});



module.exports = Chat;
