

/** @jsx React.DOM */

var Button = require('../components/Button');
var Spinner = require('../components/Spinner');

var LocationBox = React.createClass({
    getInitialState: function(){
        return{
            loading: true,
            lat: 0,
            lng: 0,
            city: 'City',
            country: 'County',
            postal_code: 'Zipcode'
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
            locBoxThis.getCity(locBoxThis.state.lat, locBoxThis.state.lng);
        });
        //TODO:send this to sever
        //return "Seattle, WA"+lat+" "+lng
    },

    getCity: function(lat, lng) {
        // make API call via jquery
        // $.get(<ENDPOINT>, callback fn);
        $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true',function(data){
            locBoxThis.setState({loading : false});
            //TODO:check if length <=2 
            results = data['results'];
            console.log(results.length);
            addresses = results[0]['address_components'];
            for(var i=0;i<addresses.length;i++){
                address = addresses[i];
                type = address['types'][0];
                if('postal_code' === type){
                    locBoxThis.setState(postal_code:address['short_name']});
                }
                if( 'locality'===type){
                    locBoxThis.setState({city:address['short_name']});
                }
                if('administrative_area_level_1' === type){
                    locBoxThis.setState({country:address['short_name']});
                }
                    
            }
        });

    },

    render: function() {
        // TODO: create popup, new component

        if(this.state.loading) {
            return <Spinner />;
        } else {
            return (
                <div id="locationBox">
                    <div id="locationText">You are at {this.state.city}, {this.state.country}</div>
                    <Button id="linkBtn">Wrong Location?</Button>
                </div>
            );
        }
    }
});

module.exports = LocationBox;
