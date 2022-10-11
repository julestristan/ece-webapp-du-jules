const http = require('http')
const handles = require('./handles')
const express = require('express')
const myAbout = require('./content/about.json')

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get(
  '/hello',
  (req, res) => {
    res.send('Hello anonymous\n')
  }
)

app.get(
  '/hello/:name', 
  function (req, res) {
    if(req.params.name === 'Thomas') { // http://localhost:3000/hello?name=Thomas
      res.send('I\'m ' + req.params.name + ' I\'m a student\n')
    }
    else {
      res.send('Hello ' + req.params.name + '\n') // params['name'] == params.name
    }
  }
)

app.get(
  '/about',
  (req, res) => {
    res.send(JSON.stringify(myAbout) + '\n')
  }
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

