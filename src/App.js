import 'App.css';
import React, { Component } from 'react';
import BoardView from 'components/BoardView.js';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BoardView date={new Date('December 17, 2014 00:00:00')} />
      </div>
    );
  }
}

export const status = { "unclicked": 0, "clicked": 1, "answered": 2};
