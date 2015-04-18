
var React = require('react-native')

var { TouchableOpacity, Image, View, } = React;

var BackButton = React.createClass({

  render: function(){
    var source = {uri: 'http://i.imgur.com/baqD8a8.png'},
        style = {width:35, height:35, marginTop: 5, marginRight: 10,  marginBottom: 2, };

    return (
 	<TouchableOpacity onPress={()=>{this.props.navigator.pop()}}>
    <Image
      source={source}
      style={style}
    />
    </TouchableOpacity>
    );
  }

});

module.exports = BackButton;
