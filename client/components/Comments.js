
var React = require('react-native');
var styles = require('../styles.js');

var {View, Text, Image} = React;

class Comments extends React.Component {

  render(){
    console.log(this.props)
    return (
     <View style={[styles.buttonContents, {
        flexDirection: 'column', 
        marginTop: 75,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 20,
      }]}>
       <View>
         <Text></Text>
         <Text style={{paddingLeft: 12, paddingRight: 12, fontSize: 14}}>{this.props.messageString}</Text>
         <Text></Text>
         <Text></Text>
       </View>
       <View style={{flexDirection: 'row'}}>
         <Text style={{fontSize: 14, color: 'grey', flex: 2, paddingTop: 5, paddingLeft: 12,}}>{this.props.timestamp} @ {this.props.distance}</Text>
         <Text style={{fontSize: 16, paddingTop: 5, color: 'grey'}}>{this.props.numHearts}</Text>
         <View style={{justifyContent: 'flex-end'}}>
           <Image
             source={heartImage}
             style={{width:30, height:30}}
           />
         </View>
       </View>
     </View>

    )
  }

}
var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Comments;