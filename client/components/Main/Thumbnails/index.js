
var React = require('react-native');
var HOST = require('../../../config.js'); 

var { Image, } = React;

class Thumbnail extends React.Component {

	render(){		
		var window = require('Dimensions').get('window');
		var uri = HOST + 'images?image=' + this.props.uri;
		
		var height = 100;
		var resizeMode = Image.resizeMode.cover;
		
		console.log("Thumb", this.props.height)

		if (this.props.fullResolution){
			//Square image. -5 to eliminate any white border.
			height = (this.props.height * (window.width/500))-5;
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
