/** @jsx React.DOM */

var EditCard = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div>
            <div class="stampSelector">Stamp Selector</div>
            <div class="main">
                <textarea class="taContent"></textarea>
            </div>
            <div class="side">
                <textarea class="taFrom"></textarea>
                <textarea class="taTo"></textarea>
            </div>
        </div>
    );
  }
});

module.exports = EditCard;
