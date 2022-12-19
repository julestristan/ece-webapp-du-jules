import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Article = () => {
  const router = useRouter()
  const { articleID } = router.query
  const supabase = useSupabaseClient()
  const [articleData, setArticleData] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getArticle() {
      const { data, error } = await supabase
        .from('articles')
        .select(`title, content`)
        .eq('id', articleID)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setArticleData(data)
      }
    }

    async function getComments() {
      const { data, error } = await supabase
        .from('comments')
        .select(`id, author, message, articleID`)
        .eq('articleID', articleID)
      if(error){
        console.log(error)
      }
      else{
        setComments(data)
      }
    }

    if(typeof id !== "undifined") {
      getArticle()
      getComments()
    }
  }, [articleID])

  const deleteArticle = async () => {
    try{
      const { data, error } = await supabase
        .from("articles")
        .delete()
        .eq('id', articleID)
      if(error) throw error
      router.push('/articles')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='min-w-full flex flex-col gap-2'>

      <div className='p-5 bg-red-300 rounded-2xl'>
        <h1 className='wt-title'>{articleData.title}</h1>
        <div>{articleData.content}</div>
      </div>

      <div className='flex gap-2'>
        <Link href={`/editArticle/${articleID}`}>
          <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-400 hover:text-slate-900"}>Edit</a>
        </Link>
        <button 
          className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900"}
          onClick={() => deleteArticle()}
        >
          Delete
        </button>
      </div>

      <div className='p-5 bg-red-300 rounded-2xl flex flex-col gap-2'>
        <div className='text-xl font-bold'>Comments</div>
        {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      <div>
        <Link href={`/editArticle/${articleID}`}>
          <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-400 hover:text-slate-900"}>New comment</a>
        </Link>
      </div>
    </div>
  )
}

// function getArticleAtributes(article) {
//   let articleData = []
//   for(var prop in article){
//     articleData.push(<>{prop} : {article[prop]}<br></br></>)
//   }
//   return articleData
// }
export default Article

export async function getServerSideProps(context) {
  console.log(context.params)
  return {
    props: {
      id: context.params.articleID
    },
  }
}

function Comment({comment}){
  const router = useRouter()
  const supabase = useSupabaseClient()

  const deleteComment = async (commentID) => {
    try{
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq('id', commentID)
      if(error) throw error
      router.push(`/articles/${comment.articleID}`)
    } catch (error) {
      alert(error.message)
    }
  }
  
  return(
    <div className='p-4 bg-red-400 rounded-2xl flex'>
      <div className='flex-1'>
        <div>{comment.author} :</div>
        <div className='ml-4'>{comment.message}</div>
      </div>
      <button 
          className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"}
          onClick={() => deleteComment(comment.id)}
        >
          Delete
        </button>
    </div>
  )
}