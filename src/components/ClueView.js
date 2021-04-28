import App from 'App.js';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ClueView extends Component {
  constructor(props) {
    super(props);
    this.state = { correct: false }
  }

  handleClick() {
    this.props.fn(this.props.obj);
  }

  renderSwitch() {
    switch (this.props.clicked) {
      case false:
        return (
          <div className={"r" + this.props.row + " " + "c" + this.props.col + " " + "div-table-col"} onClick={() => {
            this.handleClick();
          }}>
            <div className="cHeader">
              <p className="cDollar">{"$" + ((this.props.row + 1) * 200)}</p>
            </div>
            <div className="cBody">
              <p>Click to start answer</p>
            </div>
          </div>
        )
      case true:
        return (
          <div>
          <p>
            C: {this.props.answer}
          </p>
          <p>
            Y: {this.props.input}
          </p>
          <p>
            {this.props.correct ? "You are Correct" : "You are incorrect"}
          </p>
      </div>
        )
    }
  }

  render() {
    return (
      <td id={"r" + this.props.row + "c" + this.props.col}>
        {this.renderSwitch()}
      </td>
    )
  }
}