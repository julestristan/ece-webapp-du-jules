import { useRouter } from 'next/router'
import { db } from "../database"
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Article = () => {
  const router = useRouter()
  const { articleID } = router.query

  const [contact, setContact] = useState(null)
  const supabase = useSupabaseClient()
  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from('contacts')
        .select(`title, content`)
        .eq('id', id)
        .single()
      setContact(data)
    })()
  }, [id, supabase])

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
    <div className='p-5 bg-red-300 rounded-2xl'>
      <h1 className='wt-title'>Article with ID: {articleID}</h1>
      <div>{articleData}</div>
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