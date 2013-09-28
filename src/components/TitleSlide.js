/** @jsx React.DOM */

var LocationBox = require('../components/LocationBox');
var Button = require('../components/Button');

var TitleSlide = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div class="slide">
            <h1>Postcard Maker</h1>
            <LocationBox></LocationBox>
            <Button>next</Button>
        </div>
    );
  }
});

module.exports = TitleSlide;
