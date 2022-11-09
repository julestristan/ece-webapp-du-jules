import '../styles/globals.css'
import Layout from '../Layout/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} className='mb-auto flex justify-center p-5 bg-slate-400'/>
    </Layout>
    
  )
}

export default MyApp
