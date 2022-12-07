const mainRouter = require('./mainRouter')
const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 3000

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/', mainRouter)

app.get('*',(req, res) => {
  res.send('ERROR 404 : PAGE NOT FOUND')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

