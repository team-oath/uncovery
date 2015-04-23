
var React = require('react-native');
var io = require('./socket.io-client.js');

var { View, Text, Image} = React;

var NumHeartsDisplay = React.createClass({

  getInitialState: function(){
    return {
      numHearts: null,
    }
  },

  componentDidMount: function(){
    // var socket = io('http://oath-test.cloudapp.net/',{jsonp: false});
    // var userToken = this.props.userToken;

    // var updateScore = function(data){
    //   console.log(data.score)
    //   this.setState({numHearts: data.score || null});
    // };

    // socket.on('connect', function(){
    //   socket.emit('init', {userToken: userToken});
    // });

    // socket.on('score', updateScore.bind(this));
  },

  render: function(){
    return (
      <View style={{marginLeft: 7, marginBottom: 5, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection:'row',}}>
        <Image
          source={{uri: 'http://i.imgur.com/fMdIPV5.png'}}
          style={{width: 25, height: 25, justifyContent: 'space-between'}}
        />
        <Text style={{
          color:'white', 
          fontSize: 20, 
          fontFamily: 'Avenir',
        }}>
        {this.state.numHearts}
        </Text>
      </View>
    );
  }
  
})

module.exports = NumHeartsDisplay;
