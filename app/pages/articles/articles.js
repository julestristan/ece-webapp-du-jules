import { db } from "../database.js"
import displayArticleInList from "../functions"

function Articles() {
  let articleList = []
  db.articles.forEach(function(article, index) {
    articleList.push(<li className="mx-8 bg-red-300 p-5 m-2 rounded-lg">{displayArticleInList(article, index)}</li>)
  })

  return (
    <div className="">
      <h1 className="wt-title">Articles page</h1>
      <ul className="flex flex-row">{articleList}</ul>
    </div>
  )
}

export default Articles