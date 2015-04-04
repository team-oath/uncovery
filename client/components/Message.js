
var React = require('react-native');

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

var styles = StyleSheet.create({
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
  },
  rowText: {
    color: '#888888',
  },
  thumbText: {
    fontSize: 20,
    color: '#888888',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  img: {
    width: 64,
    height: 64,
    marginHorizontal: 10,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
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
