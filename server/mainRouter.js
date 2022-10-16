const express = require('express')
const router = express.Router()
const myAbout = require('./content/about.json')

const authors = ['Thomas', 'Tristan']

router.get('/', (req, res) => {
  res.send('Welcome to the home page !')
})

router.get('/hello', (req, res) => {
  res.send('Hello unknown')
})

router.get('/hello/:name', (req, res) => {
  if(authors.includes(req.params.name)){
    res.send(`I'm ${req.params.name}, I'm a student`)
  }
  else{
    res.send(`Hello ${req.params.name}`)
  }
})

router.get('/about', (req, res) => {
  res.send(JSON.stringify(myAbout))
})

module.exports = router