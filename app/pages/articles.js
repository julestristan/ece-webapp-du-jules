import Header from "../components/header"
import Footer from "../components/footer"
import db from "./database.js"
import Link from 'next/link'

function Articles() {
  let articleList = []
  db.articles.forEach(function(item, index) {
    articleList.push(<h2><Link href={`/articles/${item.id}`}><a>Article {index + 1}</a></Link></h2>)
    articleList.push(<p>{item.title}</p>)
    articleList.push(<p>{item.content}</p>)
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