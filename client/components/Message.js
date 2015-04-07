
var React = require('react-native');
var styles = require('../styles.js');

var {View, Text, TouchableOpacity, LayoutAnimation, StyleSheet} = React;

var Message = React.createClass({

  getInitialState: function() {
    return {dir: 'row'};
  },

  render: function(body) {
    var messageString = this.props.body.messageString;

    if (messageString.substring(0,10).length >= messageString.length){
      this.props.shortened = this.props.body.messageString;
    } else {
      this.props.shortened = this.props.body.messageString.substring(0,10)+'...'
    }

    return (
      <TouchableOpacity onPress={() => this._onPressMessage()}>
        {this.state.dir === 'column' ?
          <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
            <Text> </Text>
            <Text> {this.props.body.messageString} </Text>
            <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
          </View> :
          <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
            <Text> </Text>
            <Text>{this.props.shortened}</Text>
            <Text style={{fontSize: 8}}>{this.props.body.timestamp} @ {this.props.body.distance}</Text>
          </View>
          <TouchableOpacity>
            <Text>HIT method</Text>
          </TouchableOpacity>
        }
       </TouchableOpacity>
    );
  },

  _onPressMessage: function() {
    var config = layoutAnimationConfigs[0];
    LayoutAnimation.configureNext(config);
    this.setState({
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  },

  _upVoteMessage: function(id) {
    fetch('http://localhost:9090/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageId: id,
        userToken: this.state.userToken,
      })
    })
  }

});

var animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];

module.exports = Message
