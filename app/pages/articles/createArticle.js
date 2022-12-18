import { SupabaseClient } from "@supabase/supabase-js"
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React from "react"
// import axios from "axios";
import { useState } from 'react'



const CreateArticle = () => {
  const router = useRouter()
  const initialState = {
    title: "",
    content: ""
  }

  const supabase = useSupabaseClient()
  const [articleData, setArticleData] = useState(initialState)

  function handleChange(e) {
    setArticleData({ ...articleData, [e.target.name]: e.target.value })
  }
  
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(articleData)
    try{
      const { data, error } = await supabase
        .from("articles")
        .insert([
          {
            title: articleData.title,
            content: articleData.content
          }
        ])
        .single()
      if(error) throw error
      setArticleData(initialState)
      router.push('/articles')
    } catch(error){
      alert(error.message)
    }
  }
  return (
    <div>
      <div className="bg-red-600 p-2">
        <h1 className="text-center">Create new article</h1>
        <div className="bg-blue-300 flex flex-col p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input name="title" placeholder="Enter title" onChange={handleChange} value={articleData.title} required />
              <textarea name="content" placeholder="Enter content" onChange={handleChange} value={articleData.content} required />
              <button type="submit">Create</button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default CreateArticle