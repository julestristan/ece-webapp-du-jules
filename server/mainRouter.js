const express = require('express')
const router = express.Router()
const myAbout = require('./content/about.json')
const { v4: uuidv4 } = require('uuid')

const authors = ['Thomas', 'Tristan']

router.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  res.write('<h1>Welcome to the homepage !</h1><br>')
  res.write('The available routes are:<br>')
  res.write('<li><a href="http://localhost:3000/hello">Hello page</a></li>')
  res.write('<li><a href="http://localhost:3000/about">About</a></li>')
  res.write('<li><a href="http://localhost:3000/articles">Articles</a></li>')
  res.end()
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
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '1',
      author: 'Bob McLaren'
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '1',
      author: 'Thomas'
    },
    // ...
  ]
}
  
router.get('/articles', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  res.write(`<h1>List of the articles:<br></h1>`)
  db.articles.forEach(function(item, index) {
    displayArticleInList(item, index, res)
  })
  res.end()
})

router.post('/articles', (req, res) => {
  let newArticle = new Object()
  newArticle.id = uuidv4()
  newArticle.title = req.body.title
  newArticle.content = req.body.content
  newArticle.date = Date.now()
  newArticle.author = req.body.author
  db.articles.push(newArticle)
  res.end()
})

router.get('/articles/:articleId', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  const targetArticle = db.articles.find(article => article.id == req.params.articleId)
  if(targetArticle)
    displayArticle(targetArticle, res)
  else
    res.write(`Cannot find article with id : ${req.params.articleId}`)
  res.end()
})

router.get('/articles/:articleId/comments', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  const targetArticle = db.articles.find(article => article.id == req.params.articleId)
  if(targetArticle){

    res.write(`<h1>Article with ID : ${req.params.articleId}</h1>`)
    displayArticle(targetArticle, res)

    res.write(`<h1>Comments:</h1>`)
    db.comments.forEach(function(comment) {
      if(comment.articleId == targetArticle.id)
        displayComment(comment, res)
    })
  }
  else
    res.write(`Cannot find article with id : ${req.params.articleId}`)
  res.end()
})

function displayArticleInList(article, index, res) {
  res.write(`<h2><a href="http://localhost:3000/articles/${article.id}/comments">Article ${index + 1}</a></h2>`)
  displayArticle(article, res)
}

function displayArticle(article, res) {
  res.write(article.title + '<br>\n')
  res.write(article.content + '<br>\n')
  res.write('<br>\n')
}

function displayComment(comment, res) {
  res.write(`<h3>${comment.author}</h3>`)
  res.write(comment.content + '<br>\n')
  res.write('<br>\n')
}
module.exports = router