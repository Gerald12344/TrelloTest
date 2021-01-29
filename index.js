let axios = require('axios');
require('dotenv').config();

let baseUrl = 'https://api.trello.com/1/';
let urlEnd = `?key=${process.env.KEY}&token=${process.env.TOKEN}`;
let boardID = 'dDKGS5Ju';
let username = "GeraldIn2016";

(async () => {
  let data = await axios.get(`${baseUrl}boards/${boardID}/cards${urlEnd}`)

  let medals = []
  let promises = []
  
  data.data.forEach(Element => {
    if(Element.name === username){
      medals.push(Element.id)
    }
  })

  medals.forEach(Element => {
    promises.push(axios.get(`${baseUrl}cards/${Element}/list${urlEnd}`))
  })
  let values = await Promise.all(promises)

  let medalNames = values.map(e => e.data.name)
  console.log(medalNames)

})()
