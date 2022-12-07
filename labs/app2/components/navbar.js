import Link from "next/link"

const NavBar = ({navBarStyle}) => {
  return <div className={navBarStyle}>
    <Link href='/'>
      <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900 ">Home</a>
    </Link>
    <Link href='/about'>
      <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900 ">About</a>
    </Link>
  </div>
  
  // return <ul className={navBarStyle}>
  //   {[
  //     ['Home', '/'],
  //     ['About', '/about'],
  //     ['Contacts', '/contacts'],
  //     // ['Articles', '/articles'],
  //     // ['FetchingTest', '/fetchingTest'],
  //     // ['Usestate', '/use-state'],
  //     // ['LoginNative', '/login-native']
  //   ].map(([title, url]) => (
  //     <div key={url}>
  //       <li className="m-3">
  //         <Link href={url}>
  //           <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900 "}>{title}</a>
  //         </Link>
  //       </li>
  //     </div>
  //   ))
  //   }
  // </ul>

}

export default NavBar