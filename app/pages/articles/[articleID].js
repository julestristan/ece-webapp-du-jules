import { useRouter } from 'next/router'
import db from "../database"

const Article = () => {
  const router = useRouter()
  const { articleID } = router.query

  let targetArticle = db.articles.find(article => article.id == articleID)
  let articleData = (targetArticle ? getArticleAtributes(targetArticle) : "Article not found")
  let commentList = []
  db.comments.forEach(function(comment) {
    if(comment.articleId == articleID){
      commentList.push(<h3>{comment.author}</h3>)
      commentList.push(<p>{comment.content}</p>)
    } 
  })

  return (
    <div>
      <h1 className='text-3xl'>Article with ID: {articleID}</h1>
      <div className='bg-red-300'>{articleData}</div>
      <h1 className='text-3xl'>Comments:</h1>
      {commentList}
    </div>
  )
}

function getArticleAtributes(article) {
  let articleData = []
  for(var prop in article){
    articleData.push(<>{prop} : {article[prop]}<br></br></>)
  }
  return articleData
}
export default Article