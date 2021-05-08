import App from 'App.js';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ClueView extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  handleClick() {
    this.props.fn(this.props.obj);
  }

  renderSwitch() {
    switch (this.props.clicked) {
      case false:
        return (
          <td className={"unfinished"} onClick={() => {
            this.handleClick();
          }}>
            <div className="cHeader">
              <p className="cDollar">{"$" + ((this.props.row + 1) * 200)}</p>
            </div>
            <div className="cBody">
              <p>Click to start answer</p>
            </div>
          </td>
        )
      case true:
        return (
          <td className="unfinished">
            <p className="my-1">
              C: {this.props.answer}
            </p>
            <p className="my-1">
              Y: {this.props.input}
            </p>
            <p className="my-1">
              {this.props.correctness === Correctness.correct ? "You are Correct" : "You are incorrect"}
            </p>
            {this.props.correctness !== Correctness.correct ? 
            <button className="btn white-b mx-0 correct-btn" 
              onClick={() => this.props.updateCorrectness()}>
              <p className="m-0 p-0">
                MARK AS CORRECT!
              </p>
            </button> : ""}
          </td>
        )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.obj.title==="No Clue Given" ?
        <td className={"unfinished"} onClick={() => {
          this.handleClick();
        }}>
          <div className="cHeader">
            <p className="cDollar">{"$" + ((this.props.row + 1) * 200)}</p>
          </div>
          <div className="cBody">
            <p>NO CLUE GIVEN</p>
          </div>
        </td>: this.renderSwitch()}
      </React.Fragment>
    )
  }
}

export const Correctness = {correct: 0, incorrect: 1, skip: 2}