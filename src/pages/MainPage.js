/** @jsx React.DOM */

var TitleSlide = require('../components/TitleSlide.js');
var DesignSlide = require('../components/DesignSlide.js');
var EditSlide = require('../components/EditSlide.js')

var MainPage = React.createClass({
  render: function() {
    return (
        <div>
            <TitleSlide ></TitleSlide>
            <br> </br>
            <DesignSlide ></DesignSlide>
            <br> </br>
          	<EditSlide ></EditSlide>
        </div>
    );
  }
});

module.exports = MainPage;
