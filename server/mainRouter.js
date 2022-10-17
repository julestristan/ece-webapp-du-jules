const express = require('express')
const router = express.Router()
const myAbout = require('./content/about.json')
const { v4: uuidv4 } = require('uuid')

const authors = ['Thomas', 'Tristan']

router.get('/', (req, res) => {
  res.send('Welcome to the homepage !')
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

let db = {
  articles: [
    {
      id: '1',
      title: 'My article 1',
      content: 'Content of my article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'Article 2',
        content: 'Content of the article 2.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
    // ...
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    },
    // ...
  ]
}
  
router.get('/articles', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  db.articles.forEach(function(item, index, array) {
    displayArticle(item, res)
  })
  res.end()
})

router.post('/articles', (req, res) => {
  console.log(req.body)
  let newArticle = new Object()
  newArticle.id = req.body.id
  newArticle.title = req.body.title
  newArticle.content = req.body.content
  newArticle.date = req.body.date
  newArticle.author = req.body.author
  db.articles.push(newArticle)
  console.log("The new article has been added to the database !\n")
  res.end()
})

router.get('/articles/:articleId', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  const targetArticle = db.articles.find(article => article.id == req.params.articleId)
  console.log(targetArticle)
  if(targetArticle)
    displayArticle(targetArticle, res)
  else
    res.write(`Cannot find article with id : ${req.params.articleId}`)
  res.end()
})

function displayArticle(article, res) {
  res.write(article.title + '<br>\n')
  res.write(article.content + '<br>\n')
  res.write('<br>\n')
}

module.exports = router