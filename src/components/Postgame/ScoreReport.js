import 'App.css';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Art from './Art';

export default class ScoreReport extends Component {
  constructor(props) {
    super(props);
    this.state = { painting: "" };
  }

  async componentDidMount() {
    let painting = await Art.getRandomPainting(this.props.cat);
    this.setState({ painting: painting });
  }

  redoArt = () => {
    // document.getElementById("artid").setAttribute("src", "https://i0.wp.com/dariusforoux.com/wp-content/uploads/2019/06/take-a-break.png?resize=665%2C435&ssl=1");
  }

  render() {
    return (
      <Container className="score-container">
        <Row className="justify-content-md-center">
          <Col className="col-4">
            <Card>
              <Card.Body>
                <Card.Title className="mx-2 mb-4">End of Single Jeopardy</Card.Title>
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
                  Blank Answers: {this.props.numSkip}
                </Card.Text>
                <Button variant="outline-dark" className="my-3 mx-auto" onClick={this.props.deinitialize}>
                  Return to Calendar View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-4"><img id="artid" src={this.state.painting} className="painting" onError={this.redoArt} /></Col>
        </Row>
      </Container>
    )
  }
}