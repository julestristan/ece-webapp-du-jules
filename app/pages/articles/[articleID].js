import { useRouter } from 'next/router'
import db from "../database"

const Article = () => {
  const router = useRouter()
  const { articleID } = router.query
  let targetArticle = db.articles.find(article => article.id == articleID)
  let articleData = (targetArticle ? targetArticle.title : "Article not found")
  let commentList = []
  db.comments.forEach(function(comment) {
    if(comment.articleId == articleID){
      commentList.push(<h3>{comment.author}</h3>)
      commentList.push(<p>{comment.content}</p>)
    } 
  })

  return (
    <div>
      <h1>Article with ID: {articleID}</h1>
      {articleData}
      <h1>Comments:</h1>
      {commentList}
    </div>
  )
}

export default Article