
var React = require('react-native');

var Comments = require('../../Comments');
var FullHeart = require('../../Hearts/Full');
var EmptyHeart = require('../../Hearts/Empty');

var styles = require('../../../../styles.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  render: function() {

      return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View style={{paddingTop: 5, paddingLeft: 5}}>
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
            <View style={{paddingTop: 5}}>
              <Text style={{fontSize: 16, color:'grey'}}>
                {this.props.numHearts ? this.props.numHearts : null} 
              </Text>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={this.props.updateHearts}>
                <View>
                  { this.props.hasPressedHeart ?<FullHeart/>: <EmptyHeart/> }
                </View>
              </TouchableOpacity>
              </View>
          </View>
        </View>
      )
    }
  
});

module.exports = Footer;

