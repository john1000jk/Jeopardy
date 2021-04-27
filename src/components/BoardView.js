import 'App.css';
import React, { Component } from 'react';
import ClueView from 'components/ClueView';
import Clue from 'components/Clue.js';

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { clues: [], isSelected: false, top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }
  }
  async componentDidMount() {
    let data = await Clue.getClues(this.props.date);
    this.setState({ clues: this.make2dArr(data.data.slice(0, 30)) });
  }

  make2dArr(arr) {
    let newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 6));
    return newArr;
  }

  toggleSelected(obj, rect) {
    this.setState({ isSelected: !this.state.isSelected, obj: obj, top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left });
    console.log(this.state.isSelected);
    console.log(obj);
  }

  render() {
    // const boxPosition = { top: this.state.top, right: this.state.right, bottom: this.state.bottom, left: this.state.left };
    return (
      <div>
        <div>
          <p className="title">
            Jeopardy on {this.props.date.toDateString()}
          </p>
        </div>

        <table className="div-table">
          {!this.state.isSelected ?
            <div>
              <tr className={["cat-row", "div-table-row"].join(' ')}>
                {this.state.clues.length > 0 ? this.state.clues[0].map((currElem, i) => <Category key={i} col={i} obj={currElem} />) : ""}
              </tr>
              {this.state.clues.map((currElem, i) => <RowView key={i} row={i} obj={currElem} ts={(obj, rect) => this.toggleSelected(obj, rect)} />)}
            </div> :
            <div className="fill">
              <ClueView obj={this.state.obj} ts={(obj) => this.toggleSelected(obj)} />
            </div> }
        </table>
        {/* <div className="large" style={boxPosition}>
          <ClueView obj={this.state.obj} ts={(obj) => this.toggleSelected(obj)} />
        </div> */}
      </div>
    )
  }
}

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td className={["Cat", "div-table-col"].join(' ')} id={"cat" + this.props.col}>
        {this.props.obj.category.title}
      </td>
    )
  }
}

class RowView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className={["Row" + this.props.row, "div-table-row"].join(' ')}>
        {this.props.obj.map((currElem, i) => <ClueView key={i} row={this.props.row} col={i} obj={currElem} ts={this.props.ts} />)}
      </tr>
    )
  }
}