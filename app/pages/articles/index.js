import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import gravatar from 'gravatar'
import Image from 'next/image'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from('articles')
        .select(`id, title, content, created_at, author`)
        setArticles(data)
    })()
  }, [supabase])
  return (
    <div>
      <Head>
        <title>WebTech - Article list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        Article list
      </h1>
      
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {articles.map((article) => (
            <Article key={article.id} articleData={article} />
          ))}

          <Link href={user ? '/articles/createArticle' : '/login'}>
            <div className='rounded-lg themeHoverColor2 themeColor2 p-2 flex items-center justify-center'>
              <a className='font-bold text-xl'> + Create new article</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Article({articleData}){
  const supabase = useSupabaseClient()
  const [authorProfile, setAuthorProfile] = useState([])

  useEffect(() => {
    async function getAuthorProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, email`)
        .eq('id', articleData.author)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setAuthorProfile(data)
      }
    }

    if(typeof id !== "undifined") {
      getAuthorProfile()
    }
  }, [])

  function displayDate(){
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthName = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const time = Date.parse(articleData.created_at)
    const date = new Date(time)
    const currentDate = new Date()
    if(currentDate.getDate() == date.getDate() && currentDate.getMonth() == date.getMonth() && currentDate.getFullYear() == date.getFullYear())
      return 'Today ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    else return dayName[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + " " + date.getFullYear()
  }
  
  return(
    <Link href={`/articles/${articleData.id}`}>
      <div className='rounded-lg themeHoverColor2 themeColor2 p-2 flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full overflow-hidden flex items-center bg-slate-200'>
            <Image src={gravatar.url(authorProfile.email, {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={40} height={40}/>
          </div>
          <div>{authorProfile.username}</div>
        </div>
        <div className='m-2 font-bold text-xl truncate text-center'>{articleData.title}</div>
        <div>{displayDate()}</div>
      </div>
    </Link>
  )
}