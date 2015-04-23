
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
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{backgroundColor: 'white', height: require('Dimensions').get('window').height-62,}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
          onScroll={this._handleScroll.bind(this)}

        />
      </View>
    )
  }

  renderRow(){

    
  }

};

module.exports = Chats;
