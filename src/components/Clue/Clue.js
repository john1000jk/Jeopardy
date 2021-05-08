import axios from 'axios';

export default class Clue {
    constructor() {

    }
}

Clue.getClues = async(date) => {
    var dateObj = new Date(date);
    var nextDay = new Date(date);
    nextDay.setDate(dateObj.getDate() + 1);
    const result = await axios({
        method: 'get',
        url: 'https://jservice.io/api/clues',
        params: {
            min_date: dateObj,
            max_date: nextDay,
        }
    })
    return result;
}

Clue.getClues2 = async(month, day, year) => {
  const result = await axios({
    method: 'get',
    url: 'https://jarchive-json.glitch.me/game/' + month + "/" + day + "/" + year,
  })
  return result;
}