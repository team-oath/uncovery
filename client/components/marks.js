var React = require('react-native');
// var styles = require("../styles.js");


var {View, ListView, Text, TouchableOpacity, LayoutAnimation, StyleSheet} = React;

var Message = React.createClass({
  getInitialState: function() {
    return {dir: 'row'};
  },
  _onPressMessage: function() {
    var config = layoutAnimationConfigs[0];
    console.log(config)
    LayoutAnimation.configureNext(config);
    this.setState({
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  },

  render: function(body) {
    return (

    <TouchableOpacity onPress={() => this._onPressMessage()}>
      {this.state.dir === 'column' ?
        <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
          <Text> </Text>
          <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
          <Text> {this.props.body.messageString} </Text>
        </View> :
        <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
          <Text> </Text>
          <Text style={{fontSize: 8}}> {this.props.body.timestamp} @ {this.props.body.distance} </Text>
          <Text> {this.props.body.messageString.substring(0,10)} </Text>
        </View>
      }
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
     <View style={{flex: 1}}>
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
        style={styles.listView}
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

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#B0C4DE',
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
  },
  rowText: {
    color: '#888888',
  },
  thumbText: {
    fontSize: 20,
    color: '#888888',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  img: {
    width: 64,
    height: 64,
    marginHorizontal: 10,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
});

var animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];


module.exports = Marks;
