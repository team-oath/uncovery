
var React = require('react-native');
var NavigationBar = require('react-native-navbar');

var MessageFooter = require('./Message-Footer');
var CommentFooter = require('./Comment-Footer');
var Thumbnail = require('../Thumbnails');
var CommentTextInput = require('./TextInput');
var Chat = require('../Chats/Chat');

var styles = require('../../../styles.js');

var createRequestURL = require('../../createRequestURL.js');
var reportUserContent = require('../../reportUserContent.js')


var { 

  View, 
  Text, 
  Image, 
  ListView, 
  TouchableWithoutFeedback,

} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      editing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount(){
    this.fetchComments();
  }

  render(){
    return (
      <View>
        {this.props.navBar}
        <View style={{flexDirection: 'column'}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMessage.bind(this)}
            style={this.state.clicked ? 
              {backgroundColor: '#F7F8FA', height: 220} : 
              {backgroundColor: '#F7F8FA', height: 450}}
            initialListSize={10}
          />
        </View>
        <View>
          <CommentTextInput 
            editOn={this.editOn.bind(this)} 
            editOff={this.editOff.bind(this)}
            navigator={this.props.passProps.navigator}
            userToken={this.props.passProps.userToken}
            messageId={this.props.passProps.messageId}
            fetchComments={this.fetchComments.bind(this)}
            coords={this.props.passProps.coords}
          />
        </View>
      </View>
      
    );
  }

  editOn(){
    this.setState({clicked:true});
  }

  editOff(){
    this.setState({clicked:false});
    return true;
  }

  renderMessage(message) {
    
    var thumbnail;

    if (this.props.passProps.image && message.origin){  
      thumbnail = 
        <Thumbnail 
          uri={this.props.passProps.image} 
          fullResolution={true} 
          height={this.props.passProps.imageH} 
          width={this.props.passProps.imageW} 
        />
    }

    return(
      <TouchableWithoutFeedback 
        onPress={this.initializeChat.bind(this, message)}
        onLongPress={reportUserContent}
      >
        <View style={ message.origin ? 
          styles.messageContainer : 
          styles.commentContainer}>
          <View>
            <View>
              <Text></Text>
              { message.origin ? null : 
              <Text style={[styles.commentText, {color:'#C0362C'}]}>
                {message.name}:
              </Text>}
              <Text></Text>
              <Text style={message.origin ? 
                styles.messageText : 
                [styles.commentText,{fontSize: 14}]} >
                {message.commentString}
              </Text>
              <Text></Text>
              { thumbnail }
              <Text></Text>
            </View>
            { message.origin ? 
            <MessageFooter 
              timestamp={message.timestamp} 
              distance={message.distance} 
              numHearts={this.props.passProps.numHearts}
              userToken={this.props.passProps.userToken}
              hasPressedHeart={this.props.passProps.hasPressedHeart}
              messageId={this.props.passProps.messageId}
              coords={this.props.passProps.coords}
              fetchMessages={this.props.passProps.fetchMessages} 
            /> : 
            <CommentFooter 
              timestamp={message.timestamp} 
              distance={message.distance} 
              numHearts={message.votes}
              userToken={this.props.passProps.userToken}
              messageId={this.props.passProps.messageId}
              coords={this.props.coords}
              commentId={message.commentId} 
            /> }
          </View>
          <View style={styles.seperator} />
        </View>
      </TouchableWithoutFeedback>
      );
  }

  fetchComments(){

    var requestURL = createRequestURL('comment/', this.props.passProps)

    var originMessage = {
      origin: true, 
      commentString: this.props.passProps.messageString, 
      timestamp: this.props.passProps.timestamp, 
      distance: this.props.passProps.distance,
      numComments: this.props.passProps.numComments,
      numHearts: this.props.passProps.numHearts,
      userToken: this.props.passProps.userToken,
    }
 
    fetch(requestURL)
      .then((response) => response.json())
      .then((responseData) => {
        responseData.unshift(originMessage)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  initializeChat(message){
    this.props.navigator.push({
      component: Chat,
      navigationBar: <NavigationBar backgroundColor='#C0362C' />,
      passProps: {
        messageId: this.props.passProps.messageId, 
        commentId: message.commentId
      },      
    })
  }

}

module.exports = Comments;
