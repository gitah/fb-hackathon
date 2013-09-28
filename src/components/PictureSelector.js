/** @jsx React.DOM */

var PictureSelector = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div>
            <div class="MainPicture"></div>
            <div class="Selector"></div>
        </div>
    );
  }
});

module.exports = PictureSelector;
