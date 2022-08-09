const fetch = require('node-fetch');

const URL = 'http://localhost:3000/api/message/'
const text = 'un message'
const id = 'mathieu'

fetch(URL, {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
    object: 'page', entry: [{
      messaging: [
        {
          message: {
            text,
          },
          sender: {
            id
          },
        }
      ]
    }]
  })
})
  .then(res => res.text())
  .then(text => console.log(text));