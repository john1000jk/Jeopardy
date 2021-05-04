import 'App.css';
import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import Home from 'components/Home/Calendar.js'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}



App.compareStrings = function (str1, str2) {
  let str1l = str1.toLowerCase();
  let str2l = str2.toLowerCase();
  if (str1l === str2l.toLowerCase()) {
    return true;
  }
  const articles = { 'a': 1, 'an': 1, 'the': 1 };

  let str1_words = str1l.split(/(\s+)/);
  let str2_words = str2l.split(/(\s+)/);
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

App.cleanText = function (str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div.innerText;
}



export const status = { "unclicked": 0, "clicked": 1, "answered": 2 };
