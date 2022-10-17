const mainRouter = require('./mainRouter')
const express = require('express')

const app = express()
const port = 3000

app.use('/', mainRouter)

app.get('*',(req, res) => {
  res.send('ERROR 404 : PAGE NOT FOUND')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

