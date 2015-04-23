
var React = require('react-native');

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
      dataSource: null, 
    };
  },

  render: function(){
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderChat.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}

        />
      </View>
    );
  },

  renderChat: function(chat){
    return (
      <TouchableOpacity 
        onPress={this._enterChatRoom.bind(this, chat.sessionId)}>
        <View>
          <Text>{chat.name}</Text>
        </View>
      </TouchableOpacity>

    );
  },

  _enterChatRoom: function(chat){
    console.log('chat room entered')
  }

});

module.exports = Chats;
