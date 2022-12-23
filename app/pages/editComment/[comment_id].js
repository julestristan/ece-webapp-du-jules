import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import gravatar from 'gravatar'
import Image from 'next/image'

const Comment = () => {
  const user = useUser()
  const router = useRouter()
  const { comment_id } = router.query
  const supabase = useSupabaseClient()

  const initialState = {
    message: ""
  }
  const [comment, setComment] = useState(initialState)
  const [userProfile, setUserProfile] = useState([])

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

    async function getUserProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, email`)
        .eq('id', user?.id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setUserProfile(data)
      }
    }
    
    if(typeof comment_id !== "undifined") {
      getComment()
    }
    if(user)getUserProfile()
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

  return (
    <div className='min-w-full flex flex-col gap-2'>

      <div className='p-5 bg-red-300 rounded-2xl flex flex-col gap-2'>
        <h1 className='wt-title'>
          Comment edition
        </h1>
        <div className='p-4 bg-red-400 rounded-2xl flex gap-5 items-center'>
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
}
export default Comment

// export async function getServerSideProps(context) {
//   console.log(context.params)
//   return {
//     props: {
//       id: context.params.comment_id
//     },
//   }
// }

// function Comment({comment}){
//   const router = useRouter()
//   const supabase = useSupabaseClient()
//   const user = useUser()
//   const [userProfile, setUserProfile] = useState([])

//   const deleteComment = async (commentID) => {
//     try{
//       const { data, error } = await supabase
//         .from("comments")
//         .delete()
//         .eq('id', commentID)
//       if(error) throw error
//       router.reload()
//     } catch (error) {
//       alert(error.message)
//     }
//   }

//   useEffect(() => {
//     async function getUserProfile() {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select(`username, email`)
//         .eq('id', comment.author)
//         .single()
//       if(error){
//         console.log(error)
//       }
//       else{
//         setUserProfile(data)
//       }
//     }
//     getUserProfile()
//   })
  
//   return(
//     <div className='p-4 bg-red-400 rounded-2xl flex gap-5 items-center'>
//       <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={60} height={60}/>
//       <div className='flex-1 w-3/4'>
//         <div>{userProfile.username} :</div>
//         <p className='ml-4 break-normal'>{comment.message}</p>
//       </div>
//       {user?.id == comment.author ?
//         <div className='flex gap-2'>
//           <Link href={`/editArticle/${comment.id}`}>
//             <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-400 hover:text-slate-900"}>Edit</a>
//           </Link>
//           <button 
//           className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"}
//           onClick={() => deleteComment(comment.id)}
//           >
//             Delete
//           </button>
//         </div>
//       : null}
      
//     </div>
//   )
// }