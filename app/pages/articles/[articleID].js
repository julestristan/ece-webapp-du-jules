import { useRouter } from 'next/router'
import db from "../database"
import Header from "../../components/header"
import Footer from "../../components/footer"

const Article = () => {
  const router = useRouter()
  const { articleID } = router.query
  let targetArticle = db.articles.find(article => article.id == articleID)
  let articleData
  if(!targetArticle){
    articleData = "Article not found"
  }
  else{
    articleData = targetArticle.title
  }
  return (
    <div>
      <Header title="Article"/>
      <p>Article ID: {articleID}</p>
      {articleData}
      <Footer/>
    </div>
  )
}

export default Article