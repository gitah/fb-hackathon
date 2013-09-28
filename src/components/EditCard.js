/** @jsx React.DOM */

var EditCard = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div>
            <div class="stampSelector">Stamp Selector</div>
            <textarea class="taContent"></textarea>
            <textarea class="taTo"></textarea>
            <textarea class="taFrom"></textarea>
        </div>
    );
  }
});

module.exports = EditCard;
