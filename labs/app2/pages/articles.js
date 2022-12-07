import db from "../utils/database.js"
import displayArticleInList from "../utils/functions"

function Articles() {
  let articleList = []
  db.articles.forEach(function(article, index) {
    articleList.push(<li key={article.id} className="mx-8 bg-red-300 p-5 m-2 w-96 rounded-lg">{displayArticleInList(article, index)}</li>)
  })

  return (
    <div className="">
      <h1 className="wt-title">Articles page</h1>
      <ul className="flex flex-row flex-wrap justify-center">{articleList}</ul>
    </div>
  )
}

export default Articles