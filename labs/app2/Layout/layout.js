import Header from '../components/header'
import Footer from '../components/footer'
import NavBar from '../components/navbar'

export default function Layout({ children }) {
  return (
    <div className="bg-red-200 h-screen">
      <Header headerStyle='bg-indigo-600 p-3
            flex justify-center items-center
            text-white text-2xl'/>

      <NavBar navBarStyle='flex flex-row bg-green-100 flex justify-center items-center sticky top-0 rounded-l-lg bg-transparent'/>

      <main className='bg-green-100'>{children}</main>

      <Footer footerStyle='w-full bg-indigo-600 p-3
            fixed left-0 bottom-0
            flex justify-center items-center
            text-white text-2xl'/>
    </div>
  )
}