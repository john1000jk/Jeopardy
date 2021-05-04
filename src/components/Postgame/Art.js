import axios from 'axios';

export default class Art {

}

const apikey = "60fcfd23-3068-4cb4-ab10-22695a8e8285";

Art.getRandomPainting = async(category) => {
    const result = await axios({
        method: 'get',
        url: 'https://api.harvardartmuseums.org/object',
        params: {
            apikey: apikey,
            title: category,
            classification: "Paintings",
        }
    })
    console.log(result.data);
    var data = Art.shuffle(result.data.records);
    for (let i = 0; i < data.length; i++) {
      if (!data[i].images) {
        break;
      }
      if (data[i].images.length != 0) {
        let painting = data[i].images[Math.floor(Math.random() * data[i].images.length)].baseimageurl;
        console.log(painting);
        return painting;
      }
    }
    return "https://i0.wp.com/dariusforoux.com/wp-content/uploads/2019/06/take-a-break.png?resize=665%2C435&ssl=1";
}


Art.shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}