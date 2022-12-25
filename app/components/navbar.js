import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import gravatar from 'gravatar'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const NavBar = ({navBarStyle}) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState([])
  const {theme, setTheme} = useTheme()

  function signout(){
    supabaseClient.auth.signOut()
    router.push('/')
  }

  const renderThemeChanger = () => {
    if(theme === 'light') {
      return (
        <button className="navBarLink" onClick={() => setTheme('dark')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
      )
    }
    else {
      return(
        <button className="navBarLink" onClick={() => setTheme('light')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </button>
      )
    }
  }

  useEffect(() => {
    async function getUserProfile() {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select(`username, email`)
        .eq('id', user.id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setUserProfile(data)
      }
    }
    if(user)getUserProfile() 
  },[user, supabaseClient, router])

  return (
    <div className={navBarStyle}>
      <div className="flex gap-2 m-2">
        {[
          ['Home', '/'],
          ['About', '/about'],
          ['Contacts', '/contacts'],
          ['Articles', '/articles']
        ].map(([title, url]) => (
          <Link href={url} key={url}>
            <a className="navBarLink">{title}</a>
          </Link>
        ))
        }
      </div>

      <div className="flex flex-row justify-center items-center text-2xl">
        WebApp 2022
      </div>

      <div className="flex justify-end gap-2 m-2 items-center">
        {renderThemeChanger()}
        {user ?
          <div className="flex flex-row gap-2 items-center">
            <div className="flex items-center">Hello {userProfile.username}</div>
            <div className='rounded-full overflow-hidden flex items-center'>
              <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={40} height={40}/>
            </div>
            <Link href={`/profile/${user.id}`}>
              <a className="navBarLink">Profile</a>
            </Link>
            <button className={"navBarLink" + " flex"} onClick={() => signout()}>
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

            </button>
          </div>
        :
          <Link href={'/login'}>
            <a className={"navBarLink" + " flex"}>
              Login
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </a>
          </Link>
        }

      </div>
    </div>
  )
}

export default NavBar