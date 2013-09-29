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
            <h1 id="appTitle">Postcard Maker</h1>
            <LocationBox></LocationBox>
            <div class="buttons">
              <Button id="btnChoose">Choose My Post Card</Button>
            </div>
        </div>
    );
  }
});

module.exports = TitleSlide;
