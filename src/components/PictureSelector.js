/** @jsx React.DOM */

var PictureSelector = React.createClass({


  getInitialState: function() {
    return {
        currentImage: this.props.images[0], 
    };
  },

  getDefaultProps: function() {
    return {
        href: 'javascript:;',
        images: [
            "static/images/image1.jpg",
            "static/images/image2.jpg",
            "static/images/image3.jpg",
            "static/images/image4.jpg",
        ]
    };
  },

  switchCurrentImage: function(i) {
        console.log("pic selected: " + i);
        this.setState({currentImage: this.props.images[i]});
        console.log(this.state.currentImage);
  },

  render: function() {
    var foo = [];
    for(var i=0; i<this.props.images.length; i++) {
        foo.push(
            <div class="selectorImage" onClick={this.switchCurrentImage.bind(this,i)}> 
                <img src={this.props.images[i]}></img>
            </div>);
    }

    return this.transferPropsTo(
        <div>
            <div class="MainPicture">
                <img src={this.state.currentImage}></img> 
            </div>
            <div class="Selector">{foo}</div>
        </div>
    );
  }
});

module.exports = PictureSelector;
