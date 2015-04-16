
var React = require('react-native');

var Comments = require('../../Comments');
var FullHeart = require('../../Hearts/Full');
var EmptyHeart = require('../../Hearts/Empty');

var styles = require('../../../../styles.js');
var HOST = require('../../../../config.js');

var { View, Text, StyleSheet, TouchableOpacity, Image, } = React;

var Footer = React.createClass({

  // getInitialState: function(){
  //   return {hasPressedHeart: this.props.hasPressedHeart}
  // },

  // componentWillReceiveProps: function(props){
  //   this.setState({
  //     hasPressedHeart: props.hasPressedHeart,
  //   })
  // },

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

