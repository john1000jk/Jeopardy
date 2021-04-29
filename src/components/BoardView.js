import 'App.css';
import React, { Component } from 'react';
import App from 'App.js';
import ClueView, { correctness } from 'components/ClueView';
import Clue from 'components/Clue.js';
import { Correctness } from 'components/ClueView.js';
import { Card, Col, Container, Image, Row, Table } from 'react-bootstrap';
import JumboView from 'components/JumboView.js';
import Art from './Art';

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { clues: [], finishedClues: [], round: 1, obj: null, score: 0, intermission: false, numCorrect: 0, numIncorrect: 0, numBlank: 0 }
    this.testLength = 2;
  }
  async componentDidMount() {
    let data = await Clue.getClues(this.props.date);
    this.setState({ clues: this.make2dArr(data.data.slice(0, 30)), clues2: this.make2dArr(data.data.slice(30, 60)) });
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

  getRandomCat() {
    let rand = Math.floor(Math.random() * this.state.clues[0].length);
    let cat = this.state.clues[0][rand].category.title;
    return cat;
  }

  // adds clue to list of finished clues and updates score
  updateBoard(answer, input, row, col, skip = false) {
    let newScore = this.state.score;
    let isCorrect = App.compareStrings(App.cleanText(answer), input);
    let nC = 0;
    let nI = 0;
    let nB = 1;
    let correctness = Correctness.skip;
    if (this.state.finishedClues.length == this.testLength-1) {
      this.setState({intermission: true});
    }
    if (!skip) {
      nB = 0;
      if (isCorrect) {
        correctness = Correctness.correct;
        nC = 1;
        newScore += this.state.round * (row + 1) * 200;
      } else {
        correctness = Correctness.incorrect;
        nI = 1;
        newScore -= this.state.round * (row + 1) * 200;
      }
    }
    this.setState({
      finishedClues: [...this.state.finishedClues, { row: row, col: col, input: input, answer: App.cleanText(answer), correctness: correctness }],
      score: newScore, numCorrect: this.state.numCorrect + nC, numIncorrect: this.state.numIncorrect + nI, numBlank: this.state.numBlank + nB
    });
  }

  // updates the correctness of one of the finished clues
  updateCorrectness(row, col, correct) {
    let finishedClues = [...this.state.finishedClues];
    let clueIndex = this.findClueIndex(row, col);
    let clue = { ...finishedClues[clueIndex] };
    let nC = 1;
    let nI = 0;
    let nB = 0;
    switch (clue.correctness) {
      case Correctness.correct:
        nC = -1;
        break;
      case Correctness.incorrect:
        nI = -1;
        break;
      case Correctness.blank:
        nB = -1;
        break;
    }
    clue.correctness = correct;
    finishedClues[clueIndex] = clue;
    let newScore = this.state.score;
    newScore += 2 * this.state.round * (row + 1) * 200;
    this.setState({
      finishedClues: finishedClues, score: newScore, numCorrect: this.state.numCorrect + nC,
      numIncorrect: this.state.numIncorrect + nI, numBlank: this.state.numBlank + nB
    });
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
            <Col><h3>Jeopardy on {this.props.date.toDateString()}</h3></Col>
            <Col xs={2} className="score">
              {!this.state.intermission ? <p>
                Score: {this.state.score}
              </p> : "" }
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>

        {!this.state.finishedClues | this.state.finishedClues.length < this.testLength ? <Container>
          <Row className="">
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
                                updateCorrectness={() => this.updateCorrectness(row, col, Correctness.correct)}
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
        </Container> :
          <ScoreReport score={this.state.score} numCorrect={this.state.numCorrect}
            numIncorrect={this.state.numIncorrect} numBlank={this.state.numBlank} cat={this.getRandomCat()}/>
        }
        <JumboView obj={this.state.obj} row={this.state.row} col={this.state.col} update={(answer, input, row, col, skip = false) => this.updateBoard(answer, input, row, col, skip)} />
      </React.Fragment>
    )
  }
}

class ScoreReport extends Component {
  constructor(props) {
    super(props);
    this.state = { painting: "" };
  }

  async componentDidMount() {
    let painting = await Art.getRandomPainting(this.props.cat);
    this.setState({painting: painting});
  }

  render() {
    // console.log(this.props.score);
    return (
      <Container className="score-container">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="mx-2 my-4">End of Single Jeopardy</Card.Title>
                <Card.Subtitle className="mx-2 my-4">
                  Your Score is: {this.props.score}
                </Card.Subtitle>
                <Card.Text className="mx-2 my-4">
                  Correct Answers: {this.props.numCorrect}
                </Card.Text>
                <Card.Text className="mx-2 my-4">
                  Incorrect Answers: {this.props.numIncorrect}
                </Card.Text>
                <Card.Text className="mx-2 my-4">
                  Blank Answers: {this.props.numBlank}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1}></Col>
          <Col><img src={this.state.painting} className="painting"/></Col>
        </Row>
      </Container>
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