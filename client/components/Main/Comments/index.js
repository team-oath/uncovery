
var React = require('react-native');

var MessageFooter = require('./MessageFooter.js');
var CommentFooter = require('./CommentFooter.js');
var CommentsHeader = require('./CommentsHeader.js')

var styles = require('../../../styles.js');

var {View, Text, Image, ListView, TouchableOpacity} = React;

class Comments extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount(){
    this.fetchComments()
  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage.bind(this)}
        style={{backgroundColor: '#D7E1EE', height: 400}}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={2000} 
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );
  }

  renderMessage(message) {
    return(
      <View>
        <View 
          style={[styles.row, message.origin ? 
            styles.messageContainer : 
            styles.commentContainer]} >
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
            fetchMessages={this.props.fetchMessages} 
          /> : 
          <CommentFooter 
            timestamp={message.timestamp} 
            distance={message.distance} 
            userToken={this.props.userToken}
            messageId={this.props.messageId} 
          /> }
        </View>
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
 
    fetch('http://uncovery.cloudapp.net/comment/?messageId='+this.props.messageId)
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

var heartImage = {uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small'};

module.exports = Comments;
