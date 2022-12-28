import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect, useContext } from 'react'
import gravatar from 'gravatar'
import Image from 'next/image'
import { withPageAuth } from "@supabase/auth-helpers-nextjs"
import UserContext from '../../components/UserContext'

const Comment = () => {
  const { userProfile } = useContext(UserContext)
  const router = useRouter()
  const { comment_id } = router.query
  const supabase = useSupabaseClient()

  const initialState = {
    message: ""
  }
  const [comment, setComment] = useState(initialState)

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    async function getComment() {
      const { data, error } = await supabase
        .from('comments')
        .select(`id, author, message, article_id`)
        .eq('id', comment_id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setComment(data)
      }
    }
    
    if(typeof comment_id !== "undifined") {
      getComment()
    }
  }, [comment_id])

  const updateComment = async () => {
    try{
      const { data, error } = await supabase
        .from("comments")
        .update([
          {
            message: comment.message,
          }
        ])
        .eq('id', comment_id)
        .single()
      if(error) throw error
      router.push('/articles')
    } catch(error){
      alert(error.message)
    }
  }
  if(userProfile)
  return (
    <div className='min-w-full flex flex-col gap-2'>

      <div className='p-5 themeColor2 rounded-2xl flex flex-col gap-2'>
        <h1 className='wt-title'>
          Comment edition
        </h1>
        <div className='p-4 themeColor1 rounded-2xl flex gap-5 items-center'>
          <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={60} height={60}/>
          <div className='flex-1 w-3/4'>
            <div>{userProfile.username} :</div>
            <input className="rounded-lg p-1" value={comment.message} name="message" onChange={handleChange} />
          </div>
          <div className='flex gap-2'>
            <button className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-500 hover:text-slate-900"
              onClick={() => updateComment()}>
              Update
            </button>
            <button 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"
              onClick={() => router.push('/articles')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
  else return <div>Redirecting</div>
}
export default Comment

export const getServerSideProps = withPageAuth({ redirectTo: '/login'})