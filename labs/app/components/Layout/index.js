import Header from './header'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children }) {
  return (
    <div className='h-screen'>
      <Header headerStyle='bg-indigo-600 p-3
            flex justify-center items-center
            text-white text-2xl'/>

      <NavBar navBarStyle='flex flex-row bg-green-100 flex justify-center items-center sticky top-0 rounded-l-lg bg-transparent'/>

      <main className='mb-auto flex justify-center p-5 bg-slate-400'>{children}</main>

      <Footer footerStyle='w-full bg-indigo-600 p-3
            fixed left-0 bottom-0
            flex justify-center items-center
            text-white text-2xl'/>
    </div>
  )
}