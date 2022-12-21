import Header from './header'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children }) {
  return (
    <div className=''>
      <Header headerStyle='bg-indigo-600 p-3
            flex justify-center items-center
            text-white text-2xl'/>

      <NavBar navBarStyle='fixed right-0 top-1 bg-transparent flex flex-row w-full justify-between '/>

      <main className='flex justify-center p-5 bg-slate-800 min-h-screen'>{children}</main>

      <Footer footerStyle='w-full bg-indigo-600 p-3
            flex justify-center items-center
            text-white text-2xl'/>
    </div>
  )
}