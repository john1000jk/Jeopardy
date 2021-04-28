import 'App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class JumboView extends Component {
  constructor(props) {
    super(props);
    this.state = {value: "", correct: false}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.button = null;
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
    if (this.button != null) {
      this.button.removeAttribute("disabled");
    }
    return (
      <div className="ult">
        <div className="filler">
          <div className="width-40 mb-4 text-white text-center mx-auto">
            {this.props.obj != null ? this.props.obj.question.toUpperCase() : ""}
          </div>
          <div className="inputForm">
            <form onSubmit={this.handleSubmit}>
              <textarea value={this.state.value} onChange={this.handleChange} />
              <br/>
              <button className="btn btn-outline-primary white-b" ref={e1 => this.button = e1} type='submit'>Post!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}