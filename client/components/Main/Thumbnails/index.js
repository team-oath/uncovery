
var React = require('react-native');
var HOST = require('../../../config.js'); 

var { Image, } = React;

class Thumbnail extends React.Component {

  constructor(props){
    this.state = {source: props.uri}
  }

  componentWillReceiveProps(props){
    this.setState({source: props.uri})
  }

	render(){

    if (this.props.uri){
      var window = require('Dimensions').get('window');
      var height = window.width - 10; //Default to square
      var resizeMode = Image.resizeMode.cover;

      var thumbail = {
        uri: HOST + 'images?image=' + this.state.source
      }

      if (this.props.fullResolution){

        if (this.props.width > this.props.height) {

          //Landscape
          height = ( this.props.height * (window.width/500) )-5;

        } else if ( this.props.height > this.props.width ) {

          //Portrait
          height = ( (500/window.width) * window.width ) - 10;

        }

        resizeMode = Image.resizeMode.contain;
      }

      return (
        <Image 
          style={{height: height, resizeMode: resizeMode }} 
          source={thumbail} 
        />
      );

    } else { return null };
		
	}
}

module.exports = Thumbnail;

