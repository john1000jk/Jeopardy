import 'App.css';
import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Home from 'components/Home/index'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}



App.compareStrings = async function (str1, str2) {
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

  let str1_wordsNS = str1l.split(' ');
  let str2_wordsNS = str2l.split(' ');

  if (str1_wordsNS[0] in articles) {
    str1_wordsNS = str1_wordsNS.slice(1);
  }

  if (str2_wordsNS[0] in articles) {
    str2_wordsNS = str2_wordsNS.slice(1);
  }

  let promiseArr = [];
  for (let i = 0; i < str1_wordsNS.length; i++) {
    promiseArr.push(axios({
      method: 'get',
      url: 'https://api.datamuse.com/words',
      params: {
        rel_hom: str1_wordsNS[i]
      }
    }));
  }

  promiseArr = await Promise.all(promiseArr);
  let homArr = promiseArr.map((currElem, i) => currElem.data.map((currElem2) => currElem2.word));

  for (let i = 0; i < str2_wordsNS.length; i++) {
    if (str2_wordsNS.length != homArr.length || str2_wordsNS.length != str1_wordsNS.length) {
      return false;
    }

    if (str1_wordsNS[i] != str2_wordsNS[i]) {
      if (!homArr[i].includes(str2_wordsNS[i])) {
        return false;
      }
    }
  }
  
  return true;
}

App.cleanText = function (str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div.innerText;
}



export const status = { "unclicked": 0, "clicked": 1, "answered": 2 };
