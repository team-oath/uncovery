
var React = require('react-native');

var { Image, } = React;

var EmptyHeart = React.createClass({
  render(){
    return(
      <Image
        source={{uri: 'http://i.imgur.com/97rSbCf.png?1'}}
        style={{width:30, height:30}}
      />
    );
  }
});

module.exports = EmptyHeart;
