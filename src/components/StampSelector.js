/** @jsx React.DOM */

var StampSelector = React.createClass({


  getInitialState: function() {
    return {
        currentImage: this.props.images[0], 
    };
  },

  getDefaultProps: function() {
    return {
        stampIndex: 0,
        href: 'javascript:;',
        images: [
            "static/images/stamp1.jpg",
            "static/images/stamp2.gif",
            "static/images/stamp3.jpg",
        ]
    };
  },

  toggleCurrentImage: function() {
      console.log("foo");
        this.props.stampIndex += 1;
        this.setState({currentImage:this.props.images[this.props.stampIndex%3]});
        console.log(this.state.currentImage);
  },

  render: function() {
    return (
        <div class="stampSelector">
            <img src={this.state.currentImage} onClick={this.toggleCurrentImage}></img>
        </div>
    );
  }
});

module.exports = StampSelector;
