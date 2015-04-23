
var React = require('react-native');
var io = require('../../Nav/socket.io-client.js');

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
      console.log('PMINIT')
      this.state.io.emit('init', {userToken: this.props.userToken})
      this.state.io.emit('pmInit', init);
    }

    var saveSessionId = function(data){
      console.log('SAVE SESSION ID')
      this.setState({sessionId: data.sessionId});
      console.log(this.state.sessionId)
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
    console.log(this.props.navBar)
    return (
      <View>
        {this.props.navBar}
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMessage.bind(this)}
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

  _editOn: function(){


  },

  editOff: function(){


  }

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
