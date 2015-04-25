
var React = require('react-native');

var { Image, } = React;

class EmptyHeart extends React.Component {
  render(){
    return(
      <Image
        source={{uri: 'http://i.imgur.com/97rSbCf.png?1'}}
        style={{width:30, height:30, marginRight: 10}}
      />
    );
  }
};

module.exports = EmptyHeart;
