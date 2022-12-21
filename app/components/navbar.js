// import Link from "next/link"

// const NavBar = ({navBarStyle}) => {
//   return <ul className={navBarStyle}>
//     {[
//       ['Home', '/', 'mr-0'],
//       ['About', '/about', 'mr-0'],
//       ['Contacts', '/contacts', 'mr-0'],
//       ['Articles', '/articles', 'mr-4']
//     ].map(([title, url, margin]) => (
//       <li className="m-3">
//         <Link href={url}>
//           <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900 " + margin}>{title}</a>
//         </Link>
//       </li>
//     ))
//     }
//   </ul>
// }

// export default NavBar

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"


const NavBar = ({navBarStyle}) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  function signout(){
    supabaseClient.auth.signOut()
    router.push('/')
  }

  if(user)console.log(user)
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
      <div className="flex gap-2 m-2 items-center">
        {user ? <div>Hello {user.email}</div> : null}
          {user ?
            <div className="flex flex-row gap-2">
              <Link href={'/profile'}>
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