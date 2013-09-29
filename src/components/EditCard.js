/** @jsx React.DOM */
var StampSelector = require('../components/StampSelector');
var EditCard = React.createClass({
  getDefaultProps: function() {
    return {href: 'javascript:;'};
  },

  render: function() {
    return this.transferPropsTo(
        <div class="content">     
             <div class="main">
                <textarea class="ContentTA"></textarea>
             </div>  
                
            <div class="side">
                <div class="stampSelector">
                  <StampSelector></StampSelector>
                </div>
                <div class="address">
                  <textarea id="from"class="blockTA"></textarea>
                  <textarea id="to" class="blockTA"></textarea>
                </div>
             </div>

        </div>
    );
  }
});

module.exports = EditCard;
