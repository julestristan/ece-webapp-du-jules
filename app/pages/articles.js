import db from "./database.js"
import displayArticleInList from "./functions"

function Articles() {
  let articleList = []
  db.articles.forEach(function(article, index) {
    articleList.push(displayArticleInList(article, index))
  })

  return (
    <div>
      <h1>Articles page</h1>
      {articleList}
    </div>
  )
}

export default Articles