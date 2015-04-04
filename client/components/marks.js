var React = require('react-native');
var styles = require("../styles.js");

console.log(styles.listView)

var {View, ListView, Text, TouchableOpacity} = React;

var Message = React.createClass({
  getInitialState: function() {
    return {dir: 'row'};
  },
  _onPressMessage: function() {
    console.log('hello')
    // var config = layoutAnimationConfigs[0];
    // LayoutAnimation.configureNext(config);
    // this.setState({
    //   dir: this.state.dir === 'row' ? 'column' : 'row',
    // });
  },
  render: function(body) {
    return (
     <TouchableOpacity onPress={() => this._onPressMessage}>
       <View style={{flex: 1}}>
         <Text> </Text>
         <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
         <Text> {this.props.body.messageString} </Text>
       </View>
     </TouchableOpacity>
    );
  }
});

class Marks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      lastPosition: {
        coords: {
          longitude : 0, 
          latitude : 0, 
          altitude : 0,
        }
      } 
    };
   }

  componentDidMount() {
   
    var watchOptions = {
      enableHighAccuracy: true,
    };

    var watchSucess = (lastPosition) => {
      this.setState({lastPosition});
      this.fetchData();
    }

    var watchError = (error) => console.error(error);

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => console.error(error)
    );

    this.watchID = navigator.geolocation.watchPosition(
     watchSucess, watchError, watchOptions
    );

  }

  fetchData(){

    var x = this.state.lastPosition.coords.latitude;
    var y = this.state.lastPosition.coords.longitude;
    var z = this.state.lastPosition.coords.altitude;
    var requestURL = 'http://uncovery.ngrok.com/?'+'x='+x+'&'+'y='+y+'&'+'z='+z

    fetch(requestURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  renderLoadingView() {
   return (
     <View style={{flex: 1,backgroundColor: '#F5FCFF',}}>
       <Text>
         Loading messages...
       </Text>
     </View>
   );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        style={{backgroundColor: '#B0C4DE',}} 
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={2000} />

    );
  }

  renderMessage(body): ReactElement {
    return (
      (<Message body={body}/>)
    );
  }
 
};

module.exports = Marks;
