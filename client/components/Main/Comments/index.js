
var React = require('react-native');

var MessageFooter = require('./Message-Footer');
var CommentFooter = require('./Comment-Footer');
var CommentsHeader = require('./Header')

var styles = require('../../../styles.js');
var HOST = require('../../../config.js');

var {View, Text, Image, ListView, TouchableOpacity, TextInput} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    console.log("**********")
    console.log(props.image);
        console.log("**********")
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      editing: false,
    };
  }

  componentDidMount(){
    this.fetchComments()
  }

  render(){
    return (
    <View>
      <View style={{flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          style={this.state.clicked ? {backgroundColor: '#D7E1EE', height: 220} : {backgroundColor: '#D7E1EE', height: 520}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
        />
      </View>
      <View>
      <CommentsHeader
        navigator={this.props.navigator}
        userToken={this.props.userToken}
        messageId={this.props.messageId}
        fetchComments={this.fetchComments.bind(this)}
      />
      </View>
    </View>
    );
  }

  editOn(){
    this.setState({clicked:true})
  }

  editOff(){
    this.setState({clicked:false})
    return true;
  }

  // <TextInput
  //   style={{height: 50}}
  //   editable={true}
  //   enablesReturnKeyAutomatically={true}
  //   autoCorrect={false}
  //   returnKeyType={'send'}
  //   placeholder={'Be nice and make a comment...'}
  //   onFocus={this.editOn.bind(this)}
  //   onChange={(text) => console.log('gjlhsfglrshj')}
  //   onSubmitEditing={this.editOff.bind(this) && }
  // />

  // <CommentsHeader
  //   navigator={this.props.navigator}
  //   userToken={this.props.userToken}
  //   messageId={this.props.messageId}
  //   fetchComments={this.fetchComments.bind(this)}
  // />

  // commentHeaderButton: {
  //   height: 40,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#FDB515',
  //   flexDirection: 'row',
  //   marginHorizontal: 4,
  //   fontFamily: 'Avenir',
  // },

  renderMessage(message) {
    
    var thumbnail;

    if (this.props.image && message.origin){
      var window = require('Dimensions').get('window');
      var iurl = HOST + 'images?image=' + this.props.image;
      thumbnail = <Image style={{height: window.width, resizeMode: Image.resizeMode.contain }} source={{uri: iurl }} />
    }

    return(
      <View style={ message.origin ? 
            styles.messageContainer : 
            styles.commentContainer} >
        <View>
          { thumbnail }
          <View>
            <Text></Text>
            <Text style={message.origin ? 
              styles.messageText : 
              styles.commentText} >
              {message.commentString}
            </Text>
            <Text></Text>
            <Text></Text>
          </View>
          { message.origin ? 
          <MessageFooter 
            timestamp={message.timestamp} 
            distance={message.distance} 
            numHearts={message.numHearts ? message.numHearts : null}
            userToken={this.props.userToken}
            messageId={this.props.messageId}
            coords={this.props.coords}
            fetchMessages={this.props.fetchMessages} 
          /> : 
          <CommentFooter 
            timestamp={message.timestamp} 
            distance={message.distance} 
            userToken={this.props.userToken}
            messageId={this.props.messageId}
            coords={this.props.coords}
            commentId={message.commentId} 
          /> }
        </View>
        <View style={{height: 1,backgroundColor: '#f4f4f4', marginTop: 10}} />
      </View>
    )
    
  }

  renderSectionHeader(data, sectionID){
    return (
      <CommentsHeader
        navigator={this.props.navigator}
        userToken={this.props.userToken}
        messageId={this.props.messageId}
        fetchComments={this.fetchComments.bind(this)}
      />
    );
  }

  fetchComments(){

    var x = this.props.coords.latitude;
    var y = this.props.coords.longitude;
    var z = this.props.coords.altitude;

    var params = '&'+'x='+x+'&'+'y='+y+'&'+'z='+z

    var originMessage = {
      origin: true, 
      commentString:this.props.messageString, 
      timestamp: this.props.timestamp, 
      distance: this.props.distance,
      numComments: this.props.numComments,
      numHearts: this.props.numHearts,
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([originMessage]),
    })
 
    fetch(HOST + 'comment/?messageId='+this.props.messageId+params)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('********************************', responseData)
        responseData.unshift(originMessage)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

}

module.exports = Comments;
