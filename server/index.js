const mainRouter = require('./mainRouter')
const articles = require('./article')
const express = require('express')

const app = express()
const port = 3000

// app.use('/articles', articles)

app.use('/', mainRouter)

app.get('*',(req, res) => {
  res.send('ERROR 404 : PAGE NOT FOUND')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

