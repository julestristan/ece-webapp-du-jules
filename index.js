const http = require('http')
const handles = require('./handles')
const express = require('express')

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
  res.send(req.params)
})

app.put('/about', (req, res) => {
  res.send('Got a PUT request at /about')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// http.createServer(handles.serverHandle).listen(port, () => console.log(`Server is running at localhost: ${port}`))
