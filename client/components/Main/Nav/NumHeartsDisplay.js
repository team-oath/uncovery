
var React = require('react-native');

var { View, Text, Image} = React;

var NumHeartsDisplay = React.createClass({

  getInitialState: function(){
    return {
      numHearts: null,
    }
  },

  componentWillMount: function(){
    var socket = this.props.socket
    var userToken = this.props.userToken;

    var updateScore = (data) => {
      this.setState({numHearts: data.score || null});
    };

    socket.emit('init', {userToken: userToken});
    socket.on('score', updateScore.bind(this));
  },

  render: function(){
    return (
      <View style={{alignItems: 'flex-end', justifyContent: 'space-between', flexDirection:'row',}}>
        <Image
          source={{uri: 'http://i.imgur.com/fMdIPV5.png'}}
          style={{width: 35, height: 35, justifyContent: 'space-between'}}
        />
        <Text style={{
          color:'white', 
          fontSize: 20, 
          fontFamily: 'Avenir',
          marginBottom: 5,
        }}>
        {this.state.numHearts}
        </Text>
      </View>
    );
  }
  
})

module.exports = NumHeartsDisplay;
