import {status} from 'App.js';
import React, { Component } from 'react';

export default class ClueView extends Component {
    constructor(props) {
      super(props);
      this.state = {status: status.unclicked, height: null, width: null, top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0, count: 0, value: "", correct: false}
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.expand=0;
      this.button=null;
    }
  
    handleClick(rect) {
      if (this.state.status == status.unclicked) {
        let topB = (document.getElementById("cat0").getBoundingClientRect().top-rect.top-10)/20;
        let leftB = (document.getElementById("cat0").getBoundingClientRect().left-rect.left-40)/20;
        let rightB = (document.getElementById("r4c5").getBoundingClientRect().right-rect.right+40)/20;
        let bottomB = (document.getElementById("r4c5").getBoundingClientRect().bottom-rect.bottom+40)/20;
        this.setState({count: 0, status: status.clicked, isSelected: true, top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height, origRect: rect});
        this.expand=setInterval(() => {
          if (this.state.count < 20) {
            this.setState({
              top: this.state.top + topB,
              // right: this.state.right + rightB,
              // bottom: this.state.bottom + bottomB,
              left: this.state.left + leftB,
              width: this.state.width + (rightB-leftB),
              height: this.state.height + (bottomB-topB),
              count: this.state.count + 1,
            });
          } else {
            clearInterval(this.expand);
          }
        }, 10);
      } else if (this.state.status == status.clicked) {
        // this.setState({count: 0, status: status.answered, isSelected: false});
      }
      
    }

    compareStrings(str1, str2) {
      let str1l = str1.toLowerCase();
      let str2l = str2.toLowerCase();
      if (str1l === str2l.toLowerCase()) {
        return true;
      }
      const articles = {'a': 1, 'an': 1, 'the': 1};

      let str1_words = str1l.split(/(\s+)/);
      let str2_words = str2l.split(/(\s+)/);
      console.log(str1_words);
      console.log(str1_words.join(''));
      if (str1_words[0] in articles) {
        if (str1_words.slice(2).join('') === str2_words.join('') || str1_words.slice(2).join('') === str2_words.slice(2).join('')) {
          return true;
        }
      } else if (str2_words[0] in articles) {
        if (str1_words.join('') === str2_words.slice(2).join('')) {
          return true;
        }
      }
      return false;
    }

    handleSubmit(event) {
      this.setState({correct: this.compareStrings(this.props.obj.answer, this.state.value)})
      this.setState({count: 0, value: "", status: status.answered, isSelected: false});
      this.button.setAttribute("disabled", "disabled")
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }
    
    renderSwitch(status) {
      const boxPosition = {top: this.state.top, right: this.state.right, bottom: this.state.bottom, left: this.state.left, width: this.state.width, height: this.state.height};
      switch (status) {
        case 0:
          return (
            <div id={"r" + this.props.row + "c" + this.props.col} className={["r" + this.props.row, "c" + this.props.col, "div-table-col"].join(' ')} ref={this.ref} onClick={() => {
              this.handleClick(document.getElementById("r" + this.props.row + "c" + this.props.col).getBoundingClientRect());
              }}>
                <div className="cHeader">
                    <p className="cDollar">{"$" + ((this.props.row+1)*200)}</p>
                </div>
                <div className="cBody">
                  <div className="cBody">
                    Click to start answer
                  </div>
                </div>
            </div>
          
          )
        case 1:
          return (
            <div className="large" style={boxPosition}>
            <div className="largeBody" onClick={() => this.handleClick(this.state.origRect)}>
              {/* <div className="cHeader">
                  <p className="cDollar">{"$" + ((this.props.row+1)*200)}</p>
              </div> */}
              <div className="cBody">
                {this.props.obj.question}
              </div>
              <div className="inputForm">
              <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange} />
                <br />
                <button ref={e1 => this.button = e1} type='submit'>Post!</button>
              </form>
              </div>
            </div>
          </div>
          )
          case 2:
            return (
              <div className="correct">
                {this.state.correct ? "Correct for $" + ((this.props.row+1)*200) : "Incorrect"} 
              </div>
            )
      }
    }
  
  
    render() {
      return (
        <td>
          {this.renderSwitch(this.state.status)}
        </td>
      )
    }
  }