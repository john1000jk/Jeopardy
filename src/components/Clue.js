import axios from 'axios';

export default class Clue {
    constructor() {

    }
}

Clue.getClues = async(date) => {
    var nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const result = await axios({
        method: 'get',
        url: 'http://jservice.io/api/clues',
        params: {
            min_date: date,
            max_date: nextDay,
        }
    })
    return result;
}