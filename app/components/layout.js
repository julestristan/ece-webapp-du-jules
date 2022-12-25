import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children }) {
  return (
    <div className=''>
      <NavBar navBarStyle='fixed right-0 top-1 bg-indigo-600 grid grid-cols-3 w-full'/>

      <main className='flex justify-center p-5 min-h-screen pt-24'>{children}</main>

      <Footer footerStyle='w-full bg-indigo-600 p-3 flex justify-center items-center text-white text-2xl'/>
    </div>
  )
}