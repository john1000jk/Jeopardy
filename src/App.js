import 'App.css';
import React, { Component } from 'react';
import BoardView from 'components/BoardView.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import JumboView from 'components/JumboView.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={answer: false, obj: null};
  }

  render() {
    return (
      <div className="first">
        <BoardView fn={(object) => this.enableClue(object)} date={new Date('December 17, 2014 00:00:00')} />
      </div>
    );
  }
}

App.compareStrings = function(str1, str2) {
  let str1l = str1.toLowerCase();
  let str2l = str2.toLowerCase();
  if (str1l === str2l.toLowerCase()) {
    return true;
  }
  const articles = { 'a': 1, 'an': 1, 'the': 1 };

  let str1_words = str1l.split(/(\s+)/);
  let str2_words = str2l.split(/(\s+)/);
  console.log(str1_words);
  console.log(str1_words.join(''));
  if (str1_words[0] in articles) {
    if (str1_words.slice(2).join('') === str2_words.join('') || str1_words.slice(2).join('') === str2_words.slice(2).join('')) {
      return true;
    }
  } else if (str2_words[0] in articles) {
    if (str1_words.join('') === str2_words.slice(2).join('')) {
      return true;
    }
  }
  return false;
}

export const status = { "unclicked": 0, "clicked": 1, "answered": 2};
