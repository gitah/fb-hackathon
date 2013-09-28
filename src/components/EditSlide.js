/** @jsx React.DOM */

var EditCard = require('../components/EditCard')
var Button = require('../components/Button');

var EditSlide = React.createClass({
    getDefaultProps: function() {
        return {href: 'javascript:;'};
    },

    
    render: function() {
        // TODO: create popup, new component
        return (
            <div class="slide">
                <EditCard></EditCard>
                <Button>Design</Button>
                <Button>Send</Button>
            </div>
        );
    }
});

module.exports = EditSlide;
