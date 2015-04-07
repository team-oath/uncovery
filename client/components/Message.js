
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
      <View>
        {this.state.dir === 'column' ?
        <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
          <TouchableOpacity onPress={() => this._onPressMessage()}>
            <View>
              <Text> </Text>
              <Text> {this.props.body.messageString} </Text>
              <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._upVoteMessage()}>
            <Text>Like</Text>
          </TouchableOpacity>
        </View> :
        <TouchableOpacity onPress={() => this._onPressMessage()}>
          <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
            <Text> </Text>
            <Text>{this.props.shortened}</Text>
            <Text style={{fontSize: 8}}>{this.props.body.timestamp} @ {this.props.body.distance}</Text>
          </View>
        </TouchableOpacity>
        }
       </View>
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
    
    fetch('http://uncovery.cloudapp.net/upvote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messageId: 'mock',
        userToken: this.props.userToken,
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
