
var React = require('react-native');

var { Image, } = React;

class FullHeart extends React.Component {
  render(){
    return(
      <Image
        source={{uri: 'http://i.imgur.com/SXHb8nG.png?1'}}
        style={{width:30, height:30, marginRight: 10}}
      />
    );
  }
};

module.exports = FullHeart;
