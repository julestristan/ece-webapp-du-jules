import Link from "next/link"

const NavBar = ({navBarStyle}) => {
  return <ul className={navBarStyle}>
    {[
      ['Home', '/', 'mr-0'],
      ['About', '/about', 'mr-0'],
      ['Contacts', '/contacts', 'mr-0'],
      ['Articles', '/articles', 'mr-4']
    ].map(([title, url, margin]) => (
      <li className="m-3">
        <Link href={url}>
          <a className={"rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900 " + margin}>{title}</a>
        </Link>
      </li>
    ))
    }
  </ul>
}

export default NavBar