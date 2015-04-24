
var React = require('react-native');
var Chat = require('./Chat');
var io = require('../Nav/socket.io-client.js');


var {

  View, 
  ListView, 
  Text,
  TouchableOpacity,

} = React;


var Chats = React.createClass({

  getInitialState: function(){
    return { 
      chats: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function(){

    var socket = this.props.socket;
    var userToken = {userToken: this.props.userToken};

    var populateChats = (data) => {
      var chats = data.chats
      this.setState({
        chats: chats,
        dataSource: this.state.dataSource.cloneWithRows(chats)
      });
    }

    // socket.on('connect', emitToken.bind(this));
    socket.emit('pmList', userToken)
    socket.on('pmList', populateChats.bind(this));

  },

  render: function(){
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderChat.bind(this)}
          style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
          initialListSize={10}
          pageSize={4}
        />
      </View>
    );
  },

  renderChat: function(chat){
    return (
      <TouchableOpacity 
        onPress={this._enterChatRoom.bind(this, chat)}>
        <View style={{marginTop: 50, marginLeft: 50}}>
          <Text>
            {chat.chatName}
          </Text>
        </View>
      </TouchableOpacity>

    );
  },

  _enterChatRoom: function(chat){
    this.props.navigator.push({
      component: Chat,
      passProps: {
        messageId: chat.messageId,
        commentId: chat.commentId,
      }
    })
  }

});

module.exports = Chats;
