
var React = require('react-native');
var HOST = require('../../../config.js'); 

var { Image, } = React;

class Thumbnail extends React.Component {

	render(){		
		var window = require('Dimensions').get('window');
		var uri = HOST + 'images?image=' + this.props.uri;
		
		var height = window.width - 10; //Default to square
		var resizeMode = Image.resizeMode.cover;

		if (this.props.fullResolution){

			if (this.props.width > this.props.height){
				//Landscape
				height = (this.props.height * (window.width/500))-5;			
			}else if (this.props.height > this.props.width){
				//Portrait
				height = ((500/window.width) * window.width) - 10;
			}


			resizeMode = Image.resizeMode.contain;

		}

		return (
			<Image 
        style={{height: height, resizeMode: resizeMode }} 
        source={{uri: uri }} 
      />
		);
	}
}

module.exports = Thumbnail;

// /thumb = '<thumbnails>'Thumbnails({ some: propertie });
