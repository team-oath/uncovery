
var React = require('react-native');

var {

  View, 
  ListView, 
  Text,

} = React;


class Chats extends React.Component {

  constructor(props){
    this.state = {
      chats: []
    };
  }

  render(){
    return (
      <View>
        <ListView


        />
      </View>
    )
  }

};

module.exports = Chats;
