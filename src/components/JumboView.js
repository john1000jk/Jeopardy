import 'App.css';
import React, { Component } from 'react';
import App from 'App.js';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class JumboView extends Component {
  constructor(props) {
    super(props);
    this.state = {value: "",  seconds: 15, obj: null}
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.button = null;
  }

  // componentDidMount() {
  //   // this.startTimer();
  // }

  // timer works by counting down from 15 seconds
  // it is initiated when the props.obj is different from the previous object or null which is stored in state.obj
  // currently, it always counts down unless it hits 0, when you see the div, the timer will reset to 15.

  startTimer() {
    this.resetTimer();
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  resetTimer() {
    clearInterval(this.timer);
    this.setState({seconds: 15});
    this.timer=0;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
      this.handleSkip();
    }
  }

  handleSkip() {
    this.props.update(this.props.obj.answer, "SKIPPED", this.props.row, this.props.col, true)
    this.setState({value: ""});
    document.querySelector('.ult').classList.remove('visible');
    this.button.setAttribute("disabled", "disabled")
  }

  handleSubmit(event) {
    this.props.update(this.props.obj.answer, this.state.value, this.props.row, this.props.col)
    this.setState({value: ""});
    document.querySelector('.ult').classList.remove('visible');
    this.button.setAttribute("disabled", "disabled")
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    // if (this.props.obj) {
    //   console.log(this.props.obj);
    // }

    if (this.button != null) {
      this.button.removeAttribute("disabled");
    }
    if (this.props.obj && (!this.state.obj || this.props.obj.id != this.state.obj.id)) {
      this.startTimer();
      this.state.obj = this.props.obj;
    }
    return (
      <div className="ult">
        <div className="filler">
          {/* {this.state.obj ? <Timer/> : ""} */}
          <div className="width-40 my-4 text-white text-center mx-auto">
            {this.state.seconds}
          </div>
          <div className="width-40 mb-4 text-white text-center mx-auto">
            {this.props.obj ? App.cleanText(this.props.obj.question).toUpperCase() : ""}
          </div>
          <div className="inputForm">
            <form onSubmit={this.handleSubmit}>
              <textarea value={this.state.value} onChange={this.handleChange} />
              <br/>
              <button className="btn-lg btn-outline-primary white-b my-4 submit-btn" ref={e1 => this.button = e1} type='submit'>Submit!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export class Timer extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 15 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }


  componentDidMount() {
    this.setState({ seconds: 15 });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  resetTimer() {
    this.timer = 0;
    this.setState({seconds: 15});
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div className="width-40 mb-4 text-white text-center mx-auto">
        {this.state.seconds}
      </div>
    );
  }
}
