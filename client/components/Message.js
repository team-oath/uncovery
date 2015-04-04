
var React = require('react-native');
var styles = require('../styles.js')

var {View, Text, TouchableOpacity, LayoutAnimation, StyleSheet} = React;

var Message = React.createClass({

  getInitialState: function() {
    return {dir: 'row'};
  },

  _onPressMessage: function() {
    var config = layoutAnimationConfigs[0];
    console.log(config)
    LayoutAnimation.configureNext(config);
    this.setState({
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  },

  render: function(body) {
    return (
      <TouchableOpacity onPress={() => this._onPressMessage()}>
        {this.state.dir === 'column' ?
          <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
            <Text> </Text>
            <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
            <Text> {this.props.body.messageString} </Text>
          </View> :
          <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
            <Text> </Text>
            <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
            <Text> {this.props.body.messageString.substring(0,10)} </Text>
          </View>
        }
       </TouchableOpacity>
    );
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
