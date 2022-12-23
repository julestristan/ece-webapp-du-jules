import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import gravatar from 'gravatar'
import Image from 'next/image'

const NavBar = ({navBarStyle}) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState([])

  function signout(){
    supabaseClient.auth.signOut()
    router.push('/')
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
      <div className="flex flex-row justify-center items-center text-white text-2xl">
        WebApp 2022
      </div>
      <div className="flex justify-end gap-2 m-2 items-center">
        {user ?
          <div className="flex flex-row gap-2 items-center">
            <div className="flex items-center">Hello {userProfile.username}</div>
            <div className='rounded-full overflow-hidden flex items-center'>
              <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={40} height={40}/>
            </div>
            <Link href={`/profile/${user.id}`}>
              <a className="navBarLink">Profile</a>
            </Link>
            <button className="navBarLink" onClick={() => signout()}>
              Logout
            </button>
          </div>
        :
          <Link href={'/login'}>
            <a className="navBarLink">Login</a>
          </Link>
        }

      </div>
    </div>
  )
}

export default NavBar