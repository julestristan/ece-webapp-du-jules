import { SupabaseClient } from "@supabase/supabase-js"
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React from "react"
// import axios from "axios";
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CreateArticle = () => {
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
            // id: uuidv4(),
            // created_at: Date.now(),
            title: articleData.title,
            content: articleData.content
          }
        ])
        .single()
      if(error) throw error
      setArticleData(initialState)
    } catch(error){
      alert(error.message)
    }

//     let formData = new FormData();

//     for (let [key, value] of Object.entries(articleData)) {
//         formData.append(key, value);
//   }

//     // Use fetch or axios to submit the form
//     await axios
//       .post("{Formeezy-Endpoint}", formData)
//       .then(({ data }) => {
//         const { redirect } = data;
//         // Redirect used for reCAPTCHA and/or thank you page
//         window.location.href = redirect;
//       })
//       .catch((e) => {
//         window.location.href = e.response.data.redirect;
//       });
  }
  return (
    <div className="bg-red-500 p-2 flex flex-col items-center">
      <h1>Create article</h1>
      <div className="bg-blue-300 flex flex-col p-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input name="title" placeholder="Enter title" onChange={handleChange} value={articleData.title} required />
            <textarea name="content" placeholder="Enter content" onChange={handleChange} value={articleData.content} required />
            <button type="submit">Create</button>
        </form>
      </div>
      
    </div>
  )
}

export default CreateArticle