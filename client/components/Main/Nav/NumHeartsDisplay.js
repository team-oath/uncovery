
var React = require('react-native');

var io = require('./socket.io-client.js');

var { View, Text, Image} = React;

var NumHeartsDisplay = React.createClass({

  getInitialState: function(){
    return {
      io: io('http://localhost:3000',{jsonp: false}),
      numHearts: 15,
    }
  },

  componentDidMount: function(){
    var self = this;
    this.state.io.on('upvote', function(){
      var increment = self.state.numHearts + 1;
      self.setState({numHearts: increment});
    });
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
