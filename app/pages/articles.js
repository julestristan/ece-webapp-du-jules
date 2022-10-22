import db from "./database.js"
import displayArticleInList from "./functions"

function Articles() {
  let articleList = []
  db.articles.forEach(function(article, index) {
    articleList.push(<li>{displayArticleInList(article, index)}</li>)
  })

  return (
    <div>
      <h1>Articles page</h1>
      <ul>{articleList}</ul>
    </div>
  )
}

export default Articles