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
                <div class="stampSelector"><StampSelector></StampSelector></div>
                <textarea class="blockTA"></textarea>
                <textarea class="blockTA"></textarea>
             </div>

        </div>
    );
  }
});

module.exports = EditCard;
