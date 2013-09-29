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
            s3: { left: "1500px" },
            nextBtnVisible: { display: "inline-block" },
            prevBtnVisible: { display: "none" }
       };
   },

   getDefaultProps: function() {
       return {
           offset_s1: 0,
           offset_s2: 1500,
           offset_s3: 1500,
           page_offset: 1500,
           current_page: 0
       };
   },

  updatePagePos: function() {
      console.log(this.props.current_page);

      poffset = this.props.page_offset;
      currpage = this.props.current_page;
      if(this.props.current_page == 2) {
          currpage = 1;
      }
      off1 = this.props.offset_s1 - (currpage * poffset);
      off2 = this.props.offset_s2 - (currpage * poffset);
      off3 = this.props.offset_s3 - (currpage * poffset);

      nextVis = (this.props.current_page == 2) ? "none" : "inline-block";
      prevVis = (this.props.current_page == 0) ? "none" : "inline-block";

      o_s1 = { left: off1.toString() + "px" };
      o_s2 = { left: off2.toString() + "px" };
      o_s3 = { left: off3.toString() + "px" };

      if(this.props.current_page == 2) {
          o_s2['-webkit-transform'] = "rotatey(-180deg)";
      }

      this.setState({
            s1: o_s1, s2: o_s2, s3: o_s3,
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
                <div class="flipSlidesContainer">
                    <div class="flipSlides">
                        <DesignSlide style={this.state.s2}></DesignSlide>
                        <EditSlide style={this.state.s3}></EditSlide>
                    </div>
                </div>
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
