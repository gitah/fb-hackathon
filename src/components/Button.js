/** @jsx React.DOM */

var Button = React.createClass({
  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return this.transferPropsTo(
        <a role="button" class="btn" href={this.props.link}>{this.props.children}</a>
    );
  }
});

module.exports = Button;
