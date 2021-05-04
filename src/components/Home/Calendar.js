import 'App.css';
import React, { Component } from 'react';
import BoardView from 'components/Board/BoardView.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container } from 'react-bootstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: false, obj: null, isInitialized: false, date:  new Date()};
  }

  _renderDate = () => () => {
    return (
      <Container className="first">
        {!this.state.isInitialized ?
          <Container className="mx-auto my-4 text-lg-center">
            <h2>Please Choose a Jeopardy Date:</h2>
          </Container> : ""
        }
        {this.state.isInitialized ? 
        <BoardView fn={(object) => this.enableClue(object)} date={this.state.date}
          deinitialize={() => this.setState({ isInitialized: false })} /> :
        <Calendar className="mx-auto" 
          defaultValue={this.state.date}
          onClickDay={(val) => this.setState({date: val, isInitialized: true})}
          value={this.state.date}
        />}
      </Container>)
  }

  render() {
    const InlineHook = this._renderDate();
    return (
      <div>
        <InlineHook />
      </div>
    );
  }
}