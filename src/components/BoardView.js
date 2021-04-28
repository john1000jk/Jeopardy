import 'App.css';
import React, { Component } from 'react';
import App from 'App.js';
import ClueView from 'components/ClueView';
import Clue from 'components/Clue.js';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import JumboView from 'components/JumboView.js';


export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { clues: [], finishedClues: [], round: 1, obj: null}
  }
  async componentDidMount() {
    let data = await Clue.getClues(this.props.date);
    this.setState({ clues: this.make2dArr(data.data.slice(0, 30)) });
  }

  // <RowView fn={(object, row, col) => {
  //   this.props.fn(object);
  //   this.setState({finishedClues: [...this.state.finishedClues, {row: row, col: col}]});
  // }} key={i} row={i} obj={currElem}/>)}

  make2dArr(arr) {
    let newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 6));
    return newArr;
  }

  updateClue(answer, input, row, col) {
    this.setState({finishedClues: [...this.state.finishedClues, {row: row, col: col, input: input, answer: answer, correct: App.compareStrings(answer, input)}]});
  }

  updateCorrectness(row, col, correct) {
    let finishedClues = [...this.state.finishedClues];
    let clueIndex = this.findClueIndex(row, col);
    let clue = {...finishedClues[clueIndex]};
    clue.correct = correct;
    finishedClues[clueIndex] = clue;
    this.setState({finishedClues: finishedClues})
  }

  enableClue(object, row, col) {
    this.setState({obj: object, row: row, col: col});
    document.querySelector('.ult').classList.add('visible');
  }

  clueClicked(row, col) {
    return this.state.finishedClues.find(obj => obj.row === row && obj.col === col);
  }

  findClueIndex(row, col) {
    for (let i = 0; i < this.state.finishedClues.length; i++) {
      if (this.state.finishedClues[i].row === row && this.state.finishedClues[i].col === col) {
        return i;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container className="text-center m-3 mx-auto">
          <h3>Jeopardy on {this.props.date.toDateString()}</h3>
        </Container>

        <Container>
          <Row className="">
            <Col xs={1}></Col>
            <Col>
              <Table bordered className="div-table text-white text-center" size="sm">
                {!this.state.isSelected ?
                  <React.Fragment>
                    <thead>
                      <tr className={"cat-row div-table-row"}>
                        {this.state.clues.length > 0 ? this.state.clues[0].map((currElem, i) => <Category key={i} col={i} obj={currElem}/>) : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.clues.map((currElem, row) => {
                        return(<tr className={"Row" + row + " div-table-row"}>
                          {currElem.map((currElem2, col) => {
                            let found = this.clueClicked(row, col)
                            console.log(found);
                            return((found == undefined) ? <ClueView fn={(object) => {
                              this.enableClue(object, row, col);
                            }} key={row+""+col} row={row} col={col} obj={currElem2} clicked={false}/> : 
                            <ClueView fn={(object) => {
                              this.enableClue(object, row, col);
                            }} key={row+""+col} row={row} col={col} obj={currElem2} clicked={true} 
                            input={found.input} answer={found.answer} correct={found.correct}/>)})
                          }
                        </tr>)
                      }
                      )}
                    </tbody>
                  </React.Fragment> :
                  <div className="fill">
                    <ClueView obj={this.state.obj}/>
                  </div>}
              </Table>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
        <JumboView obj={this.state.obj} row={this.state.row} col={this.state.col} update={(correct, input, row, col) => this.updateClue(correct, input, row, col)}/>
      </React.Fragment>
    )
  }
}

class ScoreReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Card>
        <Card.Body>
          <Card.Title>End of Single Jeopardy</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
              Your Score is: {this.props.score}
          </Card.Subtitle>
          <Card.Text>
            Correct Answers: {this.props.correct}
          </Card.Text>
          <Card.Text>
            Incorrect Answers: {this.props.incorrect}
          </Card.Text>
          <Card.Text>
            Blank Answers: {this.props.blank}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <th style={{width: "15%"}} className={"Cat" + " " + "div-table-col"} id={"cat" + this.props.col}>
        {this.props.obj.category.title.toUpperCase()}
      </th>
    )
  }
}

class RowView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className={"Row" + this.props.row + " div-table-row"}>
        {this.props.obj.map((currElem, i) => <ClueView fn={this.props.fn} key={i} row={this.props.row} col={i} obj={currElem}/>)}
      </tr>
    )
  }
}