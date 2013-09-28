/** @jsx React.DOM */

var EditCard = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div>
                        
            <div class="main">
                <textarea class="ContentTA"></textarea>
            </div>
            

          <div class="side">
                <div class="stampSelector">Stamp Selector</div>
                <textarea class="blockTA"></textarea>
                <textarea class="blockTA"></textarea>
            </div>

        </div>
    );
  }
});

module.exports = EditCard;
