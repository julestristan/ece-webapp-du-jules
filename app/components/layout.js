import Link from "next/link";
import Head from "next/head";

const Layout = () => {
  return <div className="p-3">
    <h3>WebApp 2022</h3>

    <Link href="/">
      <a style={{ marginRight: 15 }}>Home</a>
    </Link>
    <Link href="/articles">
      <a style={{ marginRight: 15 }}>Articles</a>
    </Link>
    <Link href="/contacts">
      <a>Contact</a>
    </Link>
  </div>
}

export default Layout;