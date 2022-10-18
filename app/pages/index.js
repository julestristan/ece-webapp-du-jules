// export default function Home() {
//   return (
//     <h1>Home</h1>
//   )
// }

import Link from 'next/link'
import Header from './header.js'
import Layout from "../components/layout";

function Home() {
  return (
    <div>
      <Layout title="Homepage"/>
      <h1>Homepage</h1>
    </div>
  )
}

export default Home