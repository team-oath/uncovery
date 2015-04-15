
var React = require('react-native');

var Comments = require('../../Comments');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  // TODO change logic heartPressed initial state
    // if this.props.upvoted is true, then set to true

  render: function() {
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <View style={styles.messageFooter}>
          <TouchableOpacity onPress={this.props.navToComment}>
            <Text style={styles.messageFooter}>
              {this.props.comments || 'no'} replies
            </Text>
          </TouchableOpacity>
          <Text style={styles.messageFooter}>
            @ {this.props.distance}, {this.props.timestamp}
          </Text>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={styles.heartCounter}>
            <Text style={{color:'grey'}}>
              {this.props.numHearts ? this.props.numHearts : null}
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={this.props.updateHearts}>
            { this.props.hasPressedHeart ? 
              <Image
                source={heartFilled}
                style={{width:30, height:30}}
              />
              :
              <Image
                source={heartImage}
                style={{width:30, height:30}}
              />
            }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  },
  
});

// var heartImage = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};
// var heartFilled = {uri: 'http://i.imgur.com/6aglIdZ.png?1'};

var heartImage = {uri: 'http://i.imgur.com/97rSbCf.png?1'};
var heartFilled = {uri: 'http://i.imgur.com/SXHb8nG.png?1'};

module.exports = Footer;
