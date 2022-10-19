import Header from "../components/header"
import Footer from "../components/footer"
import db from "./database.js"
import displayArticleInList from "./functions"

function Articles() {
  let articleList = []
  db.articles.forEach(function(article, index) {
    articleList.push(displayArticleInList(article, index))
  })

  return (
    <div>
      <Header title="Articles"/>
      <h1>Articles page</h1>
      {articleList}
      <Footer/>
    </div>
  )
}

export default Articles