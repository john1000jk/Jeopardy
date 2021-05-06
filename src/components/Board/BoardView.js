import 'App.css';
import React, { Component } from 'react';
import App from 'App.js';
import ClueView from 'components/Clue/ClueView.js';
import ScoreReport from 'components/Postgame/ScoreReport';
import Clue from 'components/Clue/Clue.js';
import { Correctness } from 'components/Clue/ClueView.js';
import { Col, Container, Image, Row, Table, Button, Card } from 'react-bootstrap';
import JumboView from 'components/Board/JumboView.js';
import * as ROUTES from 'constants/routes';
import { withRouter } from 'react-router-dom';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { clues: [], clues2: null, finishedClues: [], obj: null, score: 0, numCorrect: 0, numIncorrect: 0, numSkip: 0, date: (new Date(this.props.match.params.date)).toDateString() }
    this.testLength = 5;
  }
  async componentDidMount() {
    let data = await Clue.getClues(this.state.date);
    this.setState({ clues: this.make2dArr(data.data.slice(0, 30)), clues2: this.make2dArr(data.data.slice(30, 60)) });
  }

  async componentDidUpdate(prevprops) {
    if (this.props.match.params.date != prevprops.match.params.date) {
      let data = await Clue.getClues(this.props.match.params.date);
      if (data.data.length > 0) {
        this.setState({ clues: this.make2dArr(data.data.slice(0, 30)), clues2: this.make2dArr(data.data.slice(30, 60)), date: (new Date(this.props.match.params.date)).toDateString() });
      } else {
        this.setState({ date: (new Date(this.props.match.params.date)).toDateString() });
      }
    }
  }

  make2dArr(arr) {
    let newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 6));
    return newArr;
  }

  getRandomCat() {
    let rand = Math.floor(Math.random() * this.state.clues[0].length);
    let cat = this.state.clues[0][rand].category.title;
    return cat;
  }

  // adds clue to list of finished clues and updates score
  async updateBoard(answer, input, row, col, skip = false) {
    let newScore = this.state.score;
    let isCorrect = await App.compareStrings(App.cleanText(answer), input);
    let nC = 0;
    let nI = 0;
    let nB = 1;
    let correctness = Correctness.skip;
    if (!skip) {
      nB = 0;
      if (isCorrect) {
        correctness = Correctness.correct;
        nC = 1;
        newScore += (row + 1) * 200;
      } else {
        correctness = Correctness.incorrect;
        nI = 1;
        newScore -= (row + 1) * 200;
      }
    }
    // console.log(correctness);
    this.setState({
      finishedClues: [...this.state.finishedClues, { row: row, col: col, input: input, answer: App.cleanText(answer), correctness: correctness }],
      score: newScore, numCorrect: this.state.numCorrect + nC, numIncorrect: this.state.numIncorrect + nI, numSkip: this.state.numSkip + nB
    });
  }

  // updates the correctness of one of the finished clues
  updateCorrectness(row, col) {
    let finishedClues = [...this.state.finishedClues];
    let clueIndex = this.findClueIndex(row, col);
    let clue = finishedClues[clueIndex];
    let nC = 1;
    let nI = 0;
    let nB = 0;
    // console.log(clue);
    let newScore = this.state.score;
    console.log(clue.correctness);
    switch (clue.correctness) {
      case Correctness.correct:
        nC = 0;
        break;
      case Correctness.incorrect:
        nI = -1;
        newScore += 2 * (row + 1) * 200;
        break;
      case Correctness.skip:
        nB = -1;
        newScore += (row + 1) * 200;
        break;
    }
    clue.correctness = Correctness.correct;
    finishedClues[clueIndex] = clue;
    this.setState({
      finishedClues: finishedClues, score: newScore, numCorrect: this.state.numCorrect + nC,
      numIncorrect: this.state.numIncorrect + nI, numSkip: this.state.numSkip + nB
    });
    console.log(nB);

    console.log(this.state.numSkip);
  }

  // causes jumboview to appear with given row info
  enableClue(object, row, col) {
    this.setState({ obj: object, row: row, col: col });
    document.querySelector('.ult').classList.add('visible');
  }

  // finds a clue in finishedClues
  clueClicked(row, col) {
    return this.state.finishedClues.find(obj => obj.row === row && obj.col === col);
  }

  // finds the index of a clue in finishe clues
  findClueIndex(row, col) {
    for (let i = 0; i < this.state.finishedClues.length; i++) {
      if (this.state.finishedClues[i].row === row && this.state.finishedClues[i].col === col) {
        return i;
      }
    }
  }

  render() {
    // console.log(this.state.clues);
    return (
      <React.Fragment>
        <Container className="text-center m-3 mx-auto">
          <Row>
            <Col xs={3}></Col>
            <Col><h3>Jeopardy on {this.state.date}</h3></Col>
            <Col xs={2} className="score">
              {this.state.clues.length > 0 && (!this.state.finishedClues | this.state.finishedClues.length < this.testLength) ? <p>
                Score: {this.state.score}
              </p> : ""}
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
        {this.state.clues.length > 0 ?
          <React.Fragment>
            {!this.state.finishedClues | this.state.finishedClues.length < this.testLength ? <Container>
              <Row className="my-0">
                <Col xs={1}></Col>
                <Col>
                  <Table bordered className="div-table text-white text-center" size="sm">
                    {!this.state.isSelected ?
                      <React.Fragment>
                        <thead>
                          <tr className={"cat-row div-table-row"}>
                            {this.state.clues.length > 0 ? this.state.clues[0].map((currElem, i) => <Category key={i} col={i} obj={currElem} />) : ""}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.clues.map((currElem, row) => {
                            return (<tr className={"Row" + row + " div-table-row"}>
                              {currElem.map((currElem2, col) => {
                                let found = this.clueClicked(row, col)
                                return ((found == undefined) ? <ClueView fn={(object) => {
                                  this.enableClue(object, row, col);
                                }} key={row + "" + col} row={row} col={col} obj={currElem2} clicked={false} /> :
                                  <ClueView fn={(object) => {
                                    this.enableClue(object, row, col);
                                  }} key={row + "" + col} row={row} col={col} obj={currElem2} clicked={true}
                                    input={found.input} answer={found.answer} correctness={found.correctness}
                                    updateCorrectness={() => this.updateCorrectness(row, col)}
                                  />)
                              })
                              }
                            </tr>)
                          }
                          )}
                        </tbody>
                      </React.Fragment> :
                      <div className="fill">
                        <ClueView obj={this.state.obj} />
                      </div>}
                  </Table>
                </Col>
                <Col xs={1}></Col>
              </Row>
              <Container className="text-center mx-auto">
                <Button variant="outline-dark" className="my-3 mx-auto" onClick={() => this.props.history.push(ROUTES.HOME)}>
                  Return to Calendar View
                </Button>
              </Container>
            </Container> :
              <ScoreReport score={this.state.score} numCorrect={this.state.numCorrect}
                numIncorrect={this.state.numIncorrect} numSkip={this.state.numSkip} cat={this.getRandomCat()}
                deinitialize={() => this.props.history.push(ROUTES.HOME)} />
            }
            <JumboView obj={this.state.obj} row={this.state.row} col={this.state.col} update={(answer, input, row, col, skip = false) => this.updateBoard(answer, input, row, col, skip)} />
          </React.Fragment> :
          <React.Fragment>
            {this.state.clues2 != null ?
            <NotFound date={this.state.date} deinitialize={() => this.props.history.push(ROUTES.HOME)} /> :
            ""}
          </React.Fragment>
          }
      </React.Fragment>
    )
  }
}

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ width: '40rem' }} className="my-2 mx-auto no-border">
        <Card.Img variant="top" className="cloud mx-auto" src="https://img.icons8.com/ios/452/error-cloud--v2.png" />
        <Card.Body>
          <Card.Title>Error Jeopardy Game Not Found for date: {this.props.date}</Card.Title>
          <Card.Text>
            Please return to the main page and choose another date.
          </Card.Text>
        </Card.Body>
        <Button variant="outline-dark" className="my-3 mx-auto" onClick={this.props.deinitialize}>
          Return to Calendar View
        </Button>
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
      <th style={{ width: "15%" }} className={"Cat" + " " + "div-table-col"} id={"cat" + this.props.col}>
        {this.props.obj.category.title.toUpperCase()}
      </th>
    )
  }
}

export default withRouter(BoardView);