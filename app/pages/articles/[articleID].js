import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import gravatar from 'gravatar'
import Image from 'next/image'

const Article = () => {
  const user = useUser()
  const router = useRouter()
  const { articleID } = router.query
  const supabase = useSupabaseClient()
  const [articleData, setArticleData] = useState([])
  const [comments, setComments] = useState([])
  const [authorProfile, setAuthorProfile] = useState([])

  const initialState = {
    message: ""
  }
  const [comment, setComment] = useState(initialState)

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    async function getArticle() {
      const { data, error } = await supabase
        .from('articles')
        .select(`title, content, author, created_at`)
        .eq('id', articleID)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setArticleData(data)
        getAuthorProfile(data.author)
        getComments()
      }
    }

    async function getComments() {
      const { data, error } = await supabase
        .from('comments')
        .select(`id, author, message, article_id`)
        .eq('article_id', articleID)
      if(error){
        console.log(error)
      }
      else{
        setComments(data)
      }
    }

    async function getAuthorProfile(author_id) {
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, email`)
        .eq('id', author_id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setAuthorProfile(data)
      }
    }

    if(typeof articleID !== "undifined") {
      getArticle()
    }
  }, [router])

  const deleteArticle = async () => {
    deleteComments()
    try{
      const { data, error } = await supabase
        .from("articles")
        .delete()
        .eq('id', articleID)
      if(error) throw error
      router.replace('/articles')
    } catch (error) {
      alert(error.message)
    }
  }

  const deleteComments = async () => {
    try{
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq('article_id', articleID)
      if(error) throw error
    } catch (error) {
      alert(error.message)
    }
  }

  const sendComment = async () => {
    try{
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            author: user?.id,
            message: comment.message,
            article_id: articleID
          }
        ])
        .single()
      if(error) throw error
      setComment(initialState)
      router.replace(`/articles/${articleID}`)
      
    } catch(error){
      alert(error.message)
    }
  }

  function displayDate(){
    const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const monthName = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const time = Date.parse(articleData.created_at)
    const date = new Date(time)
    return dayName[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + " " + date.getFullYear()
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='p-5 themeColor2 rounded-2xl flex flex-col gap-2'>
        <h1 className='wt-title'>
          {articleData.title}
        </h1>
        <div className='my-8 themeColor1 rounded-lg p-2'>
          {articleData.content}
        </div>
        <div className='flex flex-row gap-2 items-center justify-between'>
          <div className='flex flex-row gap-4 items-center'>
            <div>By {authorProfile?.username}</div>
            <Image src={gravatar.url(authorProfile?.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={50} height={50}/>
            {displayDate()}
          </div>
          {user?.id == articleData.author ?
            <div className='flex gap-2 items-center'>
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
          : null}
        </div>
      </div>

      <div className='p-5 themeColor2 rounded-2xl flex flex-col gap-2'>
        <div className='text-xl font-bold'>Comments</div>
        {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>

      {user?
        <div className='p-5 bg-blue-300 rounded-2xl flex flex-col gap-4'>
          <div>Write comment :</div>
          <textarea className="rounded-lg p-2 dark:bg-neutral-700" name="message" placeholder="Comment" onChange={handleChange} value={comment.message}/>
          <button 
            className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-500 hover:text-slate-900"}
            onClick={() => sendComment()}>
            Send
          </button>
        </div>
      : null}
    </div>
  )
}
export default Article

export async function getServerSideProps(context) {
  console.log('context: ')
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
  const user = useUser()
  const [userProfile, setUserProfile] = useState([])

  const deleteComment = async (commentID) => {
    try{
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq('id', commentID)
      if(error) throw error
      router.reload()
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    async function getUserProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, email`)
        .eq('id', comment.author)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setUserProfile(data)
      }
    }
    getUserProfile()
  })
  
  return(
    <div className='p-4 themeColor1 rounded-2xl flex gap-5 items-center'>
      <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={60} height={60}/>
      <div className='flex-1 w-3/4'>
        <div>{userProfile.username} :</div>
        <p className='ml-4 break-normal'>{comment.message}</p>
      </div>
      {user?.id == comment.author ?
        <div className='flex gap-2'>
          <Link href={`/editComment/${comment.id}`}>
            <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-400 hover:text-slate-900"}>Edit</a>
          </Link>
          <button 
          className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"}
          onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      : null}
      
    </div>
  )
}