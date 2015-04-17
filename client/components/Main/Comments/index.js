
var React = require('react-native');

var MessageFooter = require('./Message-Footer');
var CommentFooter = require('./Comment-Footer');
var Thumbnail = require('../Thumbnails');
var CommentTextInput = require('./TextInput');

var styles = require('../../../styles.js');
var HOST = require('../../../config.js');

var { View, Text, Image, ListView, TouchableOpacity, } = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      editing: false,
    };
  }

  componentDidMount(){
    this.fetchComments();
  }

  render(){
    return (
    <View>
      <View style={{flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMessage.bind(this)}
          style={this.state.clicked ? 
            {backgroundColor: '#D7E1EE', height: 220} : 
            {backgroundColor: '#D7E1EE', height: 520}}
          initialListSize={10}
          pageSize={4}
          scrollRenderAheadDistance={2000} 
        />
      </View>
      <View>
        <CommentTextInput 
          editOn={this.editOn.bind(this)} 
          editOff={this.editOff.bind(this)}
          navigator={this.props.navigator}
          userToken={this.props.userToken}
          messageId={this.props.messageId}
          fetchComments={this.fetchComments.bind(this)}
          coords={this.props.coords}
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

    if (this.props.image && message.origin){  
      thumbnail = 
        <Thumbnail 
          uri={this.props.image} 
          fullResolution={true} 
          height={this.props.imageH} 
          width={this.props.imageW} 
        />
    }

    return(
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
            { thumbnail }
            <Text></Text>
          </View>
          { message.origin ? 
          <MessageFooter 
            timestamp={message.timestamp} 
            distance={message.distance} 
            numHearts={this.props.numHearts}
            userToken={this.props.userToken}
            hasPressedHeart={this.props.hasPressedHeart}
            messageId={this.props.messageId}
            coords={this.props.coords}
            fetchMessages={this.props.fetchMessages} 
          /> : 
          <CommentFooter 
            timestamp={message.timestamp} 
            distance={message.distance} 
            numHearts={message.votes}
            userToken={this.props.userToken}
            messageId={this.props.messageId}
            coords={this.props.coords}
            commentId={message.commentId} 
          /> }
        </View>
        <View style={styles.seperator} />
      </View>
      );
  }

  fetchComments(){

    var route = 'comment/'
    var x = this.props.coords.latitude;
    var y = this.props.coords.longitude;
    var z = this.props.coords.altitude;
    var id = this.props.messageId;
    var params = `?messageId=${id}&x=${x}&y=${y}&z=${z}`;
    
    var originMessage = {
      origin: true, 
      commentString: this.props.messageString, 
      timestamp: this.props.timestamp, 
      distance: this.props.distance,
      numComments: this.props.numComments,
      numHearts: this.props.numHearts,
      userToken: this.props.userToken,
    }
 
    fetch(`${HOST}${route}${params}`)
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

}

module.exports = Comments;
