/** @jsx React.DOM */

var EditCard = require('../components/EditCard')
var Button = require('../components/Button');

var EditSlide = React.createClass({
    getDefaultProps: function() {
        return {href: 'javascript:;'};
    },

    
    render: function() {
        // TODO: create popup, new component
        return this.transferPropsTo(
            <div class="slide" id="EditSlide">
                <EditCard></EditCard>
            </div>
        );
    }
});

module.exports = EditSlide;
