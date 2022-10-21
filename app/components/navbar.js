import Link from "next/link"

const NavBar = () => {
  return <ul className="flex flex-row justify-center">
    {[
      ['Home', '/'],
      ['About', '/about'],
      ['Contacts', '/contacts'],
      ['Articles', '/articles']
    ].map(([title, url]) => (
      <li>
        <Link href={url}>
          <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-400 hover:text-slate-900">{title}</a>
        </Link>
      </li>
    ))
    }
  </ul>
}

export default NavBar