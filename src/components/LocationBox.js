/** @jsx React.DOM */

var Button = require('../components/Button');

var LocationBox = React.createClass({
    getDefaultProps: function() {
        return {href: 'javascript:;'};
    },

    getLocation: function() {
        // TODO: replace with API
        return "Seattle, WA"
    },

    render: function() {
        // TODO: create popup, new component
        return (
            <div>
                <div>You are at {this.getLocation()}</div>
                <Button>Wrong Location?</Button>
            </div>
        );
    }
});

module.exports = LocationBox;
