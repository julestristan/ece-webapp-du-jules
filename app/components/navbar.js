import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'


const NavBar = ({navBarStyle}) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [username, setUsername] = useState([])
  const id = user?.id

  console.log(user)

  function signout(){
    supabaseClient.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select(`username`)
        .eq('id', id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setUsername(data)
      }
    }
    if(user)getUsername() 
  },[user])
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
      <div className="text-white text-2xl"> WebApp 2022</div>
      <div className="flex gap-2 m-2 items-center">
        {user ? <div>Hello {username.username}</div> : null}
          {user ?
            <div className="flex flex-row gap-2">
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