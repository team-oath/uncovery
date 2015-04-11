
var React = require('react-native');
var styles = require('../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  getInitialState: function(){
    return {
      numHearts: this.props.numHeartsIntial
    }

  },

  render: function(){
    console.log("render?")
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.messageFooter}>{this.props.timestamp} @ {this.props.distance}</Text>
        <Text style={styles.heartCounter}>{this.state.numHearts}</Text>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={this._heartMessage}>
            <Image
              source={heartImage}
              style={{width:30, height:30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  },

  _heartMessage: function(){
    var increment = this.state.numHearts+=1
    this.setState({numHearts: increment})
    console.log(this.state)
  }
});

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Footer;