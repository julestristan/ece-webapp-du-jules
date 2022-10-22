import Header from './header'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <main className="bg-orange-300">{children}</main>
      <Footer />
    </>
  )
}