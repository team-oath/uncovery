
var React = require('react-native');

var { Image, } = React;

var FullHeart = React.createClass({
  render(){
    return(
      <Image
        source={{uri: 'http://i.imgur.com/SXHb8nG.png?1'}}
        style={{width:30, height:30}}
      />
    );
  }
})

module.exports = FullHeart;
