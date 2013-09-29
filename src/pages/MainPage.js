/** @jsx React.DOM */

var TitleSlide = require('../components/TitleSlide.js');
var DesignSlide = require('../components/DesignSlide.js');
var EditSlide = require('../components/EditSlide.js')
var Button = require('../components/Button');

var MainPage = React.createClass({
    getInitialState: function(){
        return{
            s1: { left: "0px" },
            s2: { left: "1500px" },
            s3: { left: "3000px" },
            nextBtnVisible: { display: "inline-block" },
            prevBtnVisible: { display: "none" }
       };
   },

   getDefaultProps: function() {
       return {
           offset_s1: 0,
           offset_s2: 1500,
           offset_s3: 3000,
           page_offset: 1500,
           current_page: 0
       };
   },

  updatePagePos: function() {
      console.log(this.props.current_page);
      off1 = this.props.offset_s1 - (this.props.current_page * this.props.page_offset);
      off2 = this.props.offset_s2 - (this.props.current_page * this.props.page_offset);
      off3 = this.props.offset_s3 - (this.props.current_page * this.props.page_offset);

      nextVis = (this.props.current_page == 2) ? "none" : "inline-block";
      prevVis = (this.props.current_page == 0) ? "none" : "inline-block";

      this.setState({
            s1: { left: off1.toString() + "px" },
            s2: { left: off2.toString() + "px" },
            s3: { left: off3.toString() + "px" },
            nextBtnVisible: { display: nextVis },
            prevBtnVisible: { display: prevVis }
      });
  },

  nextPage: function() {
      this.props.current_page += 1;
      this.updatePagePos();
  },

  prevPage: function() {
      this.props.current_page -= 1;
      this.updatePagePos();
  },

  render: function() {
    return (
        <div>
            <div>
                <TitleSlide style={this.state.s1}></TitleSlide>
                <DesignSlide style={this.state.s2}></DesignSlide>
                <EditSlide style={this.state.s3}></EditSlide>
            </div>
            <div class='navButtons'>
                <Button style={this.state.prevBtnVisible} onClick={this.prevPage} class="prevBtn">Prev</Button>
                <Button style={this.state.nextBtnVisible} onClick={this.nextPage} class="nextBtn">Next</Button>
            </div>
        </div>
    );
    }
});

module.exports = MainPage;
