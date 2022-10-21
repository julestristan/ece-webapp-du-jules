import Header from './header'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}