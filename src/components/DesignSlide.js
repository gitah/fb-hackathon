/** @jsx React.DOM */

var PictureSelector = require('../components/PictureSelector');
var Button = require('../components/Button');

var DesignSlide = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div class="slide" id="DesignSlide">
            <PictureSelector></PictureSelector>
            <div class="buttons">
              <Button class="btnLeft">Edit Info</Button>
              <Button class="btnRight">Write</Button>
            </div> 
        </div>
    );
  }
});

module.exports = DesignSlide;
