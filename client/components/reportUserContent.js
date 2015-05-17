
var ActionSheetIOS = require('ActionSheetIOS');
var React = require('react-native');

var { AlertIOS } = React;

var url = 'http://uncovery.cloudapp.net/api/';

var reportUserContent = function(props){

  var reportButtons = ['Report','Block','Cancel'];

  ActionSheetIOS.showActionSheetWithOptions({
    options: reportButtons,
    cancelButtonIndex: reportButtons.length-1
  },

  (buttonIndex) => {
    
    if ( buttonIndex === 0 ) { showReportSheet(); }

    if ( buttonIndex === 1 ) {

       AlertIOS.alert(
        'User Blocked!',
        'You will no longer see user\'s content'
        )
      
      // fetch(url+'block', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //    commentId: props.commentId,
      //     messageId: props.messageId,
      //     userToken: props.userToken,
      //  });

    }

  });

};

function showReportSheet(){

  var reportTypes = [

    'Profanity',
    'Violence',
    'Sexual Content',
    'Harassment', 
    'Other',
    'Cancel'

  ];

  ActionSheetIOS.showActionSheetWithOptions({
    options: reportTypes,
    cancelButtonIndex: reportTypes.length-1
  },

  (buttonIndex) => {

    if ( buttonIndex !== reportTypes.length-1 ) {

      AlertIOS.alert(
        'Content Reported!',
        'Your Case # is '
      )
      
    }
   

    // fetch(url+'report', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //    commentId: props.commentId,
    //     messageId: props.messageId,
    //     userToken: props.userToken,
    //     report: reportTypes[buttonIndex],
    //  });

  });

}

module.exports = reportUserContent;
