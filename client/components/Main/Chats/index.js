
var React = require('react-native');
var Chat = require('./Chat');

var NavigationBar = require('react-native-navbar');
var BackButton = require('../Nav/BackButton.js');

var {

  View, 
  ListView, 
  Text,
  TouchableOpacity,
  Navigator,

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

    socket.emit('pmList', userToken)
    socket.on('pmList', populateChats.bind(this));

  },

  render: function(){
    return (
      <View>
        {this.props.navBar}
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderChat.bind(this)}
            style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
            initialListSize={10}
            pageSize={4}
          />
        </View>
      </View>
    );
  },

  renderChat: function(chat){
    return (
      <View style={{backgroundColor: '#ffcf00'}}>
        <TouchableOpacity 
          onPress={this._enterChatRoom.bind(this, chat)}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 30}}>
            <Text style={{fontSize: 30, fontFamily: 'Avenir', color: 'white'}}>
              {chat.chatName}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 2,backgroundColor: 'white',}}/>
      </View>
      

    );
  },

  _enterChatRoom: function(chat){
    this.props.navigator.push({
      component: Chat,
      passProps: {
        messageId: chat.messageId,
        commentId: chat.commentId,
      },
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      navigationBar: 
        <NavigationBar 
          backgroundColor='#C0362C'
          title={chat.chatName}
          titleColor='white'
          customPrev={<BackButton/>}
        />,
    })
  }

});

module.exports = Chats;
