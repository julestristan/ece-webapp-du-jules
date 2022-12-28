import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React from "react"
import { useState, useEffect } from 'react'
import { withPageAuth } from "@supabase/auth-helpers-nextjs"

const EditArticle = () => {
  const router = useRouter()
  const { articleID } = router.query
    const initialState = {
      title: "",
      content: ""
    }

  const supabase = useSupabaseClient()
  const [articleData, setArticleData] = useState(initialState)

  function handleChange(e) {
    setArticleData({ ...articleData, [e.target.name]: e.target.value })
  }

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
    if(typeof id !== "undifined") {
      getArticle()
    }
  }, [])
  
  async function handleSubmit(e) {
    e.preventDefault()
    try{
      const { data, error } = await supabase
        .from("articles")
        .update([
          {
            title: articleData.title,
            content: articleData.content
          }
        ])
        .eq('id', articleID)
      if(error) throw error
      setArticleData(initialState)
      router.replace(`/articles/${articleID}`)
    } catch(error){
      alert(error.message)
    }
  }
  
  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='p-5 themeColor2 rounded-2xl flex flex-col gap-2'>
        <h1 className='wt-title'>Edit article</h1>
        <div className="flex flex-col p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input className="rounded-lg p-2" name="title" placeholder="Enter title" onChange={handleChange} value={articleData.title} required />
            <label htmlFor="content">Content:</label>
            <textarea className="rounded-lg p-2 dark:bg-neutral-700" name="content" placeholder="Enter content" onChange={handleChange} value={articleData.content} required />
            <button
              className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-blue-600 bg-blue-500 hover:text-slate-900'
              type="submit"
            >
              Update
            </button>
            <button 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"
              onClick={() => router.replace(`/articles`)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditArticle

export const getServerSideProps = withPageAuth({ redirectTo: '/login'})