var React = require('react-native')

var { Image, TouchableOpacity, View, Text, } = React

var CameraRollButton = React.createClass({

  render(){

    return (

      <TouchableOpacity onPress={this.props.navToCameraRoll}>
        <Image
          source={{uri: 'https://farm3.staticflickr.com/2806/12530652945_ea31e0a2e1_o.png'}}
          style={{width:30, height: 30}}
        />
      </TouchableOpacity>
    )
  }
});

module.exports = CameraRollButton;
