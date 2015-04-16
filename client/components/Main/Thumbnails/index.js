
var React = require('react-native');
var HOST = require('../../../config.js'); 

var { Image, } = React;

class Thumbnail extends React.Component {

	render(){		
		var window = require('Dimensions').get('window');
		var uri = HOST + 'images?image=' + this.props.uri;
		
		var height = window.width;
		var resizeMode = Image.resizeMode.cover;
		
		if (this.props.fullResolution){
			//Square image. Minus a small amount to eliminate any white border.
			if (this.props.height>=500){
				height = this.props.height-10;
			}else{
				height = (this.props.height * (window.width/500))-5;
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
