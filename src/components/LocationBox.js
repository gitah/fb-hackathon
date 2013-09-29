

/** @jsx React.DOM */

var Button = require('../components/Button');
var Spinner = require('../components/Spinner');

var LocationBox = React.createClass({
    getInitialState: function(){
        return{
            loading: true,
            lat: 0,
            lng: 0
       };
   },

    getDefaultProps: function() {
        return {href: 'javascript:;'};
    },
    

    componentDidMount: function() {
        locBoxThis = this;
        navigator.geolocation.getCurrentPosition(function(position){
            locBoxThis.setState({lat : position.coords.latitude});
            locBoxThis.setState({lng : position.coords.longitude});
            locBoxThis.setState({loading : false});
            locBoxThis.getCity(locBoxThis.state.lat, locBoxThis.state.lng);
        });
        //TODO:send this to sever
        //return "Seattle, WA"+lat+" "+lng
    },

    getCity: function(lat, lng) {
        // make API call via jquery
        // $.get(<ENDPOINT>, callback fn);
    }

    render: function() {
        // TODO: create popup, new component
        if(this.state.loading) {
            return <Spinner />;
        } else {
            return (
                <div id="locationBox">
                    <div id="locationText">You are at {this.state.lat}, {this.state.lng}</div>
                    <Button id="wrongLocBtn">Wrong Location?</Button>
                </div>
            );
        }
    }
});

module.exports = LocationBox;
