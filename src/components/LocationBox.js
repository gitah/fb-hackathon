

/** @jsx React.DOM */

var Button = require('../components/Button');

var LocationBox = React.createClass({
    getInitialState: function(){
        return{
            lat: 0,
            lng: 0,
       };
   },

    getDefaultProps: function() {
        return {href: 'javascript:;'};
    },
    

    componentDidMount: function() {
        navigator.geolocation.getCurrentPosition(function(position){
            this.setState({lat : position.coords.latitude});
            this.setState({lng : position.coords.longitude});
            alert(this.state.lat);
            alert('foo');
        });
        alert('test');
        //TODO:send this to sever
        //return "Seattle, WA"+lat+" "+lng
    },

    render: function() {
        // TODO: create popup, new component
        return (
            <div id="locationBox">
                <div id="locationText">You are at {this.state.lat}, {this.state.lng}</div>
                <Button id="wrongLocBtn">Wrong Location?</Button>
            </div>
        );
    }
});

module.exports = LocationBox;
